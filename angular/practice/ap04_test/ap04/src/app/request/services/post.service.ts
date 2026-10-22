import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { combineLatest, map, shareReplay } from 'rxjs';
import { Post, PostWithAuthor, ProgressLevel, Todo, User, UserProgress } from '../models/post.model';

const API = 'https://jsonplaceholder.typicode.com';

// providedIn: 'root' -> one instance for the whole app, no `providers: [PostService]` needed
// HttpClient itself is registered in app.config.ts with provideHttpClient()
@Injectable({
    providedIn: 'root'
})

// shared by two components:
//   -> PostListComponent      uses postsWithAuthors$  (posts + users)
//   -> UserProgressComponent  uses userProgress$      (users + posts + todos)
// both need posts$ and users$, but thanks to shareReplay(1) each url is requested only once
export class PostService {
    private readonly http = inject(HttpClient);

    // shareReplay(1): the first subscriber triggers the request,
    // every later subscriber (any component) gets the cached response
    readonly posts$ = this.http.get<Post[]>(`${API}/posts`).pipe(shareReplay(1));
    readonly users$ = this.http.get<User[]>(`${API}/users`).pipe(shareReplay(1));
    readonly todos$ = this.http.get<Todo[]>(`${API}/todos`).pipe(shareReplay(1));

    // posts joined with their author
    readonly postsWithAuthors$ = combineLatest([this.posts$, this.users$]).pipe(
        map(([posts, users]): PostWithAuthor[] =>
            posts.map(post => ({ ...post, author: users.find(u => u.id === post.userId) }))
        ),
    );

    // per-user numbers, sorted by best todo completion first
    readonly userProgress$ = combineLatest([this.users$, this.posts$, this.todos$]).pipe(
        map(([users, posts, todos]): UserProgress[] =>
            users
                .map(user => {
                    const userTodos = todos.filter(t => t.userId === user.id);
                    const todosDone = userTodos.filter(t => t.completed).length;
                    const postCount = posts.filter(p => p.userId === user.id).length;
                    const completion = userTodos.length ? todosDone / userTodos.length : 0;

                    return {
                        user,
                        postCount,
                        postShare: postCount / posts.length,
                        todosDone,
                        todosTotal: userTodos.length,
                        completion,
                        level: this.levelOf(completion),
                    };
                })
                .sort((a, b) => b.completion - a.completion)
        ),
    );

    private levelOf(completion: number): ProgressLevel {
        if (completion < 0.4) return 'low';
        if (completion < 0.6) return 'mid';
        return 'high';
    }
}

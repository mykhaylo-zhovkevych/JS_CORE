// shapes of the JSONPlaceholder responses (only the fields we use)

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    website: string;
    company: { name: string; catchPhrase: string };
}

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

// combined shapes built inside PostService
export interface PostWithAuthor extends Post {
    author?: User;
}

export type ProgressLevel = 'low' | 'mid' | 'high';

export interface UserProgress {
    user: User;
    postCount: number;
    postShare: number;   // 0..1 -> share of all posts
    todosDone: number;
    todosTotal: number;
    completion: number;  // 0..1 -> done / total
    level: ProgressLevel;
}

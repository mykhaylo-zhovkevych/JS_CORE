import { Injectable, computed, signal } from '@angular/core';
import { Observable, map, timer } from 'rxjs';

export type Role = 'user' | 'admin';

export interface User {
  name: string;
  role: Role;
}

const PASSWORD = 'angular';
const STORAGE_KEY = 'ap011.user';

const USERS: readonly User[] = [
  { name: 'Ada', role: 'admin' },
  { name: 'Linus', role: 'admin' },
  { name: 'Uli', role: 'user' },
  { name: 'Grace', role: 'user' },
  { name: 'Tim', role: 'user' },
];

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<User>;
    const valid = typeof data.name === 'string' && (data.role === 'user' || data.role === 'admin');
    return valid ? { name: data.name!, role: data.role! } : null;
  } catch {
    return null; // corrupt JSON, or storage blocked (private mode)
  }
}

function saveUser(user: User | null): void {
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly _user = signal<User | null>(loadUser());
  public readonly user = this._user.asReadonly();
  public readonly isLoggedIn = computed(() => this._user() !== null);
  public readonly role = computed(() => this._user()?.role ?? null);

  // Returns an Observable like HttpClient.post() would.
  // Observables are lazy: nothing happens until someone calls .subscribe(),
  // and every subscribe() runs the whole chain again (= a new login, a new random user).
  public login(password: string): Observable<User> {
    // timer(1000) waits 1000 ms, then emits once. That's our fake network delay.
    return timer(1000).pipe(
      // Throwing inside map() turns into an error notification -> subscribe({ error }).
      map(() => {
        if (password !== PASSWORD) throw new Error('Wrong password');
        const user = USERS[Math.floor(Math.random() * USERS.length)];
        this.setUser(user); // store it (signal + localStorage) before handing it to the subscriber
        return user;
      }),
    );
  }

  public logout(): void {
    this.setUser(null);
  }

  private setUser(user: User | null): void {
    this._user.set(user);
    saveUser(user);
  }
}

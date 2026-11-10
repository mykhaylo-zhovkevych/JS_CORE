import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

export type Role = 'user' | 'admin';

export interface User {
  name: string;
  role: Role;
}

export interface Session {
  token: string;
  user: User;
}

const STORAGE_KEY = 'ap012.session';

function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
      const s = JSON.parse(raw) as Partial<Session>;
      const ok = typeof s.token === 'string' && typeof s.user?.name === 'string' && (s.user.role === 'user' || s.user.role === 'admin');
    return ok ? (s as Session) : null;
  } catch {
    return null;
  }
}

function saveSession(session: Session | null): void {
  try {
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // storage blocked: login still works, just not across a refresh
  }
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly _session = signal<Session | null>(loadSession());
  public readonly user = computed(() => this._session()?.user ?? null);
  public readonly token = computed(() => this._session()?.token ?? null);
  public readonly isLoggedIn = computed(() => this._session() !== null);

  public login(name: string, password: string): Observable<User> {
    return this.http.post<Session>('/api/login', { name, password })
      .pipe(
        tap((session) => this.setSession(session)),
        map((session) => session.user),
    );
  }

  public logout(): void {
    this.setSession(null);
  }

  private setSession(session: Session | null): void {
    this._session.set(session);
    saveSession(session);
  }
}

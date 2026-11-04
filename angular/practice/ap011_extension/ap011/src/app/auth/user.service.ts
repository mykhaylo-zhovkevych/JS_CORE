import { Injectable, computed, signal } from '@angular/core';
// Same pattern as ObjectStore: private writable signal, public read-only view.

export type Role = 'user' | 'admin';

export interface User {
  name: string;
  role: Role;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly _user = signal<User | null>(null);
  public readonly user = this._user.asReadonly();
  public readonly isLoggedIn = computed(() => this._user() !== null);
  public readonly role = computed(() => this._user()?.role ?? null);

  public login(role: Role): void {
    this._user.set({ name: role === 'admin' ? 'Ada' : 'Uli', role });
  }

  public logout(): void {
    this._user.set(null);
  }
}

import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../core/auth/user.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-slate-50">
      <nav class="flex items-center gap-2 border-b border-slate-200 bg-white px-6 py-3">
        <a routerLink="/books" routerLinkActive="bg-slate-900 text-white"
           [routerLinkActiveOptions]="{ exact: true }"
           class="rounded-md px-3 py-1.5 hover:bg-slate-100">Books</a>
        <a routerLink="/books/new" routerLinkActive="bg-slate-900 text-white"
           class="rounded-md px-3 py-1.5 hover:bg-slate-100">+ New</a>

        @if (user.user(); as u) {
          <span class="ml-auto text-sm text-slate-600">{{ u.name }} ({{ u.role }})</span>
          <button type="button" (click)="logout()"
                  class="rounded-md border border-slate-300 px-2 py-1 text-sm hover:bg-slate-100">Logout</button>
        }
      </nav>

      <main class="mx-auto max-w-3xl p-6">
        <router-outlet />
      </main>
    </div>
  `,
})
export class MainLayout {
  protected readonly user = inject(UserService);
  private readonly router = inject(Router);

  protected logout(): void {
    this.user.logout();
    this.router.navigateByUrl('/auth/login');
  }
}

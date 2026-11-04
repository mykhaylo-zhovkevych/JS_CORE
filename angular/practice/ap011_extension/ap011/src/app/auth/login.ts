import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Role, UserService } from './user.service';

@Component({
  selector: 'app-login',
  template: `
    <section class="w-96 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 class="mb-2 text-lg font-semibold text-slate-800">Login</h2>

      @if (returnUrl(); as url) {
        <p class="mb-4 text-sm text-amber-700">
          A guard sent you here. You wanted to open <code>{{ url }}</code>.
        </p>
      }

      @if (user.user(); as u) {
        <p class="text-sm text-slate-600">Already logged in as {{ u.name }} ({{ u.role }}).</p>
      } @else {
        <div class="flex gap-2">
          <button type="button" (click)="login('user')"
                  class="rounded-md bg-slate-900 px-3 py-1.5 text-white hover:bg-slate-700">Log in as user</button>
          <button type="button" (click)="login('admin')"
                  class="rounded-md bg-emerald-600 px-3 py-1.5 text-white hover:bg-emerald-700">Log in as admin</button>
        </div>
      }
    </section>
  `,
})
export class LoginPage {
  protected readonly user = inject(UserService);
  private readonly router = inject(Router);

  public readonly returnUrl = input<string>();

  protected login(role: Role): void {
    this.user.login(role);
    this.router.navigateByUrl(this.returnUrl() ?? '/dashboard');
  }
}

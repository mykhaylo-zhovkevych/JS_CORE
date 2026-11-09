import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { UserService } from './user.service';

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
        <!-- preventDefault: stop the browser from reloading the page on submit -->
        <form class="flex flex-col gap-2" (submit)="$event.preventDefault(); login(pw.value)">
          <input #pw type="password" placeholder="Password (hint: angular)" [disabled]="loading()"
                 class="rounded-md border border-slate-300 px-3 py-1.5" />
          <button type="submit" [disabled]="loading()"
                  class="rounded-md bg-slate-900 px-3 py-1.5 text-white hover:bg-slate-700 disabled:opacity-50">
            {{ loading() ? 'Logging in…' : 'Log in' }}
          </button>
          @if (error(); as e) {
            <p class="text-sm text-red-600">{{ e }}</p>
          }
        </form>
      }
    </section>
  `,
})
export class LoginPage {
  protected readonly user = inject(UserService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  public readonly returnUrl = input<string>();

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  protected login(password: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.user.login(password)
      // In-app navigation only: if the user clicks another nav link during the 1000 ms,
      // this component is destroyed -> unsubscribe -> the login is cancelled, so we don't
      // yank them back to the dashboard. (A refresh or closed tab kills all JS anyway)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigateByUrl(this.safeReturnUrl()),
        error: (err: Error) => {
          this.error.set(err.name);
          this.loading.set(false);
        },
      });
  }

  // Only allow paths inside this app ("/x"), never "//evil.com" or "https://..."
  private safeReturnUrl(): string {
    const url = this.returnUrl();
    return url?.startsWith('/') && !url.startsWith('//') ? url : '/dashboard';
  }
}

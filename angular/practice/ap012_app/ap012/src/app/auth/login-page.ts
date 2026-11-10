import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { UserService } from '../core/auth/user.service';
import { errorMessage } from '../core/http-error';

@Component({
  selector: 'app-login-page',
  template: `
    <section class="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 class="mb-4 text-xl font-semibold text-slate-800">Login</h1>

      @if (expired()) {
        <p class="mb-3 rounded-md bg-amber-50 p-2 text-sm text-amber-800">
          Your session expired (the server answered 401). Please log in again.
        </p>
      }

      <form class="flex flex-col gap-2" (submit)="$event.preventDefault(); login(name.value, pw.value)">
        <input #name placeholder="Name (ada or uli)" autocomplete="username" [disabled]="loading()"
               class="rounded-md border border-slate-300 px-3 py-1.5" />
        <input #pw type="password" placeholder="Password (angular)" autocomplete="current-password"
               [disabled]="loading()" class="rounded-md border border-slate-300 px-3 py-1.5" />
        <button type="submit" [disabled]="loading()"
                class="rounded-md bg-slate-900 px-3 py-1.5 text-white hover:bg-slate-700 disabled:opacity-50">
          {{ loading() ? 'Logging in…' : 'Log in' }}
        </button>
        @if (error(); as e) {
          <p class="text-sm text-red-600">{{ e }}</p>
        }
      </form>

      <p class="mt-4 text-xs text-slate-500">ada = admin (may delete), uli = user. Tokens expire after 2 min.</p>
    </section>
  `,
})
export class LoginPage {
  private readonly user = inject(UserService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  // From the URL thanks to withComponentInputBinding(): ?returnUrl=...&expired=1
  public readonly returnUrl = input<string>();
  public readonly expired = input<string>();

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  protected login(name: string, password: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.user
      .login(name.trim(), password)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigateByUrl(this.safeReturnUrl()),
        error: (err: unknown) => {
          const wrongCredentials = err instanceof HttpErrorResponse && err.status === 401;
          this.error.set(wrongCredentials ? 'Wrong name or password.' : errorMessage(err));
          this.loading.set(false);
        },
      });
  }

  private safeReturnUrl(): string {
    const url = this.returnUrl();
    console.log('returnUrl', url, 'expired', this.expired());
    return url?.startsWith('/') ? url : '/books';
  }
}

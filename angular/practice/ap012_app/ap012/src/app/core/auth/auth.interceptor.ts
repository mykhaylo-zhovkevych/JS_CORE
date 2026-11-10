import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserService } from './user.service';

// An interceptor sits between your code and the network. EVERY request made through
// HttpClient (also httpResource, which uses HttpClient) passes through here:
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const user = inject(UserService);
  const router = inject(Router);

  // Requests are immutable: you can't change req, you must make a mutable copy
  const token = user.token();
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError((err: unknown) => {
      const isLoginCall = req.url.endsWith('/api/login');
      if (err instanceof HttpErrorResponse && err.status === 401 && !isLoginCall) {
        user.logout();
        router.navigate(['/auth/login'], { queryParams: { returnUrl: router.url, expired: 1 } });
      }
      return throwError(() => err);
    }),
  );
};

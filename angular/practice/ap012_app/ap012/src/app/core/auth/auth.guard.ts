import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const user = inject(UserService);
  const router = inject(Router);

  return user.isLoggedIn() || router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
};

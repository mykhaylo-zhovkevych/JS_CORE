import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../auth/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const user = inject(UserService);
  const router = inject(Router);

  //console.log('[authGuard]', state.url);

  return user.isLoggedIn() || router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};

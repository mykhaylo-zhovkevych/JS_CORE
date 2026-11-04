import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserService } from '../auth/user.service';

@Injectable({ providedIn: 'root' })
export class AuthClassGuard implements CanActivate {
  constructor(
    private readonly user: UserService,
    private readonly router: Router,
  ) {}

  // route = the route being activated (params, data ...)
  // state = the whole target router state; state.url is the url the user wanted
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    //console.log('[AuthClassGuard] canActivate', state.url);

    if (this.user.isLoggedIn()) return true;
    return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }
}

import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../auth/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  imports: [RouterLink, RouterLinkActive],
  styleUrls: ['./navigation.component.scss'],
})
export class MyNavigation {
  protected readonly user = inject(UserService);
  private readonly router = inject(Router);

  // Guards only run when a NAVIGATION happens. Logging out does not kick you off a
  // protected page by itself, so we navigate away ourselves.
  // Navigate FIRST: if canDeactivate says "stay" (unsaved comment -> Cancel),
  // the navigation resolves to false and we stay logged in.
  protected logout(): void {
    this.router.navigateByUrl('/login').then((ok) => ok && this.user.logout());
  }
}

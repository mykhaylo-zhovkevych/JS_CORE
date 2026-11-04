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

  protected logout(): void {
    this.router.navigateByUrl('/login').then((ok) => ok && this.user.logout());
  }
}

import { Component, inject } from '@angular/core';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <section class="w-md rounded-xl border border-emerald-300 bg-emerald-50 p-5">
      <h2 class="text-lg font-semibold text-emerald-800">Admin dashboard</h2>
      <p class="text-sm text-emerald-700">
        Hi {{ user.user()?.name }}. url: <code>/dashboard</code> – matched by the FIRST route (canMatch: adminMatch).
      </p>
    </section>
  `,
})
export class AdminDashboard {
  protected readonly user = inject(UserService);
}

@Component({
  selector: 'app-user-dashboard',
  template: `
    <section class="w-md rounded-xl border border-slate-200 bg-white p-5">
      <h2 class="text-lg font-semibold text-slate-800">User dashboard</h2>
      <p class="text-sm text-slate-600">
        Hi {{ user.user()?.name }}. url: <code>/dashboard</code> – adminMatch said false, so the router
        fell through to the SECOND route (canActivate: authGuard).
      </p>
    </section>
  `,
})
export class UserDashboard {
  protected readonly user = inject(UserService);
}

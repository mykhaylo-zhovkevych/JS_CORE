import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  template: `
    <div class="flex h-screen items-center justify-center bg-slate-100 p-4">
      <router-outlet />
    </div>
  `,
})
export class AuthLayout {}

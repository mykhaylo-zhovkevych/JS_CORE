import { Routes } from '@angular/router';

import { SimpleCalc } from './calc/simple-calc';
import { AdvancedCalc } from './calc/advanced-calc';
import { MyEmptyPage } from './components/empty-route/empty-route.component';
import { LoginPage } from './auth/login';
import { AdminDashboard, UserDashboard } from './dashboard/dashboards';
import { AuthClassGuard } from './guards/auth-class.guard';
import { authGuard } from './guards/auth.guard';
import { adminMatch } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'simple', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'simple', component: SimpleCalc },
  { path: 'advanced', component: AdvancedCalc, canActivate: [AuthClassGuard] },
  { path: 'dashboard', canMatch: [adminMatch], component: AdminDashboard },
  { path: 'dashboard', canActivate: [authGuard], component: UserDashboard },

  {
    path: 'object-list',
    canActivateChild: [authGuard],
    loadChildren: () => import('./object-list/object-list.routes').then((m) => m.objectListRoutes),
  },

  { path: '**', component: MyEmptyPage },
];

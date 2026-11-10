import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { AuthLayout } from './layout/auth-layout';
import { MainLayout } from './layout/main-layout';

export const routes: Routes = [
  // Frame 1: pages for logged-out users, no nav.  -> /auth/login
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      { path: 'login', loadComponent: () => import('./auth/login-page').then((m) => m.LoginPage) },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  // Frame 2: the app itself. ONE guard on the parent protects every child page.
  {
    path: '',
    component: MainLayout,
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'books', pathMatch: 'full' },
      { path: 'books', loadComponent: () => import('./books/book-list-page').then((m) => m.BookListPage) },
      { path: 'books/:id', loadComponent: () => import('./books/book-edit-page').then((m) => m.BookEditPage) },
    ],
  },

  { path: '**', redirectTo: 'books' },
];

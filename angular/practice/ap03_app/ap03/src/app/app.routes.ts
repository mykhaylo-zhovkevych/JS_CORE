import { Routes } from '@angular/router';

import { SimpleCalc } from './calc/simple-calc';
import { AdvancedCalc } from './calc/advanced-calc';
import { MyEmptyPage } from './components/empty-route/empty-route.component';

export const routes: Routes = [
  { path: '', redirectTo: 'simple', pathMatch: 'full' },
  { path: 'simple', component: SimpleCalc },
  { path: 'advanced', component: AdvancedCalc },
  {
    path: 'object-list',
    // lazy load a routes array instead of an NgModule
    loadChildren: () => import('./object-list/object-list.routes').then((m) => m.objectListRoutes)
  },
  { path: '**', component: MyEmptyPage }
];

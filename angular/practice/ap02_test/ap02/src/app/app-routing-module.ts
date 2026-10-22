import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SimpleCalc } from './calc/simple-calc';
import { AdvancedCalc } from './calc/advanced-calc';
import {MyEmptyPage} from './components/empty-route/empty-route.component';

const routes: Routes = [
  { path: '', redirectTo: 'simple', pathMatch: 'full' },
  { path: 'simple', component: SimpleCalc },
  { path: 'advanced', component: AdvancedCalc },
  {
    path: 'object-list',
    loadChildren: () => import('./object-list/object-list.module').then((m) => m.MyObjectListModule)
  },
  // { path: '**', redirectTo: 'simple' },
  {path: '**', component: MyEmptyPage}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

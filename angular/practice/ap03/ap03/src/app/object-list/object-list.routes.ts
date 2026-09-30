import { Routes } from '@angular/router';
import { MyObjectListComponent } from './components/list/object-list.component';
import { MyObjectItemComponent } from './components/item/object-item.component';

// replaces MyObjectListModule + MyObjectListRouting (RouterModule.forChild)
export const objectListRoutes: Routes = [
  { path: '', component: MyObjectListComponent },
  { path: ':id', component: MyObjectItemComponent },
];

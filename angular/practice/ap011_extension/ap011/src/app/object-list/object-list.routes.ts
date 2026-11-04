import { Routes } from '@angular/router';
import { MyObjectListComponent } from './components/list/object-list.component';
import { MyObjectItemComponent } from './components/item/object-item.component';
import { unsavedChangesGuard } from './unsaved-changes.guard';

export const objectListRoutes: Routes = [
  { path: '', component: MyObjectListComponent },
  { path: ':id', component: MyObjectItemComponent, canDeactivate: [unsavedChangesGuard] },
];

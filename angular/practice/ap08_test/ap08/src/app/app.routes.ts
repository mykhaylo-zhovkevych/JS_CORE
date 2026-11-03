import { Routes } from '@angular/router';
import { FormsPage } from './forms/forms-page';

export const routes: Routes = [
    {path: '', component: FormsPage},
    {path: '**', redirectTo: ''},
];

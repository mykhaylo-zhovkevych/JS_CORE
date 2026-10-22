import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyNavigation } from './navigation.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  // standalone: its template uses <app-navigation> and <router-outlet>
  imports: [
    MyNavigation,
    RouterOutlet
  ],
})
export class MyLayout {
}

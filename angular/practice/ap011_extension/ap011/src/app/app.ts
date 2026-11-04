import { Component, signal } from '@angular/core';
import { MyLayout } from './components/navigation/layout.component';

@Component({
  selector: 'app-root',
  imports: [MyLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ap011');
}

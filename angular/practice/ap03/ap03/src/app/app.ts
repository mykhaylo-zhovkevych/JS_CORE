import { Component, signal } from '@angular/core';
import { MyLayout } from './components/navigation/layout.component';

@Component({
  selector: 'app-root',
  // standalone (default): no AppModule, the component imports what its template uses
  imports: [MyLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ap03');
}

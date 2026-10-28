import { Component, signal } from '@angular/core';
import { CustomFormComponent } from './customForm/formComponent';

@Component({
  selector: 'app-root',
  imports: [CustomFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ap06');
}

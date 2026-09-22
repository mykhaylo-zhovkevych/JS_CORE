import { Component, signal } from '@angular/core';
import { SimpleCalc } from './calc/simple-calc';
import { AdvancedCalc } from './calc/advanced-calc';

@Component({
  selector: 'app-root',
  imports: [SimpleCalc, AdvancedCalc],
  templateUrl: './app.component.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ap01');
}

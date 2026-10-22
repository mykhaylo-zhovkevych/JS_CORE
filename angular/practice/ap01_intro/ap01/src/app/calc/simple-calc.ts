import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calculator } from './calculator';

@Component({
  selector: 'app-simple-calc',
  imports: [FormsModule],
  templateUrl: './simple-calc.html',
})
export class SimpleCalc {
  // the component owns a model instance instead of extending it
  calc = new Calculator();
}

import { Component } from '@angular/core';
import { Calculator } from './calculator';

@Component({
  selector: 'app-simple-calc',
  standalone: false, // declared in MyCalcualtorModule instead of importing its own deps
  templateUrl: './simple-calc.html',
})
export class SimpleCalc {
  // the component owns a model instance instead of extending it
  calc = new Calculator();
}

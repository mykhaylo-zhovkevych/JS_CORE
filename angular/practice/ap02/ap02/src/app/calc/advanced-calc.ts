import { Component } from '@angular/core';
import { AdvancedCalculator } from './advancedCalculator';

@Component({
  selector: 'app-advanced-calc',
  standalone: false, // declared in MyCalcualtorModule instead of importing its own deps
  templateUrl: './advanced-calc.html',
})
export class AdvancedCalc {
  calc = new AdvancedCalculator();
}

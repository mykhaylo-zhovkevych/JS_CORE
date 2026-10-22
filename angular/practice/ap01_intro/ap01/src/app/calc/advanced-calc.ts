import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdvancedCalculator } from './advancedCalculator';

@Component({
  selector: 'app-advanced-calc',
  imports: [FormsModule],
  templateUrl: './advanced-calc.html',
})
export class AdvancedCalc {
  calc = new AdvancedCalculator();
}

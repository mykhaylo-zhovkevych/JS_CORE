import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SimpleCalc } from './simple-calc';
import { AdvancedCalc } from './advanced-calc';

@NgModule({
  // components that belong to this module
  declarations: [
    SimpleCalc,
    AdvancedCalc
  ],
  // FormsModule provides [(ngModel)] to every component declared above
  imports: [FormsModule],
  // makes <app-simple-calc> / <app-advanced-calc> usable in modules that import this one
  exports: [
    SimpleCalc,
    AdvancedCalc
  ],
  providers: [
  ],
})
export class MyCalcualtorModule { }

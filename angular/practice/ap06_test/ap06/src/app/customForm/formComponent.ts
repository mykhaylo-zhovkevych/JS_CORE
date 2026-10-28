import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormLogic, errorText } from './formLogic';

@Component({
  selector: 'app-custom-form',
  imports: [ReactiveFormsModule, JsonPipe],
  providers: [FormLogic],
  templateUrl: './form.html',
})
export class CustomFormComponent {
  protected readonly logic = inject(FormLogic);
  protected readonly controls = this.logic.form.controls;
  protected readonly errorText = errorText;
}

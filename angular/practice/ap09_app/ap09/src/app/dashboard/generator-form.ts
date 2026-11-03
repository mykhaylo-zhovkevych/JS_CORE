import { Component, ElementRef, inject, viewChild } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RandomApi } from '../core/random-api';

function minBelowMax(group: AbstractControl): ValidationErrors | null {
  const { min, max } = group.value;
  return min < max ? null : { minNotBelowMax: true };
}

@Component({
  selector: 'app-generator-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="generate()" class="form-row">
      <label>
        Count
        <input #countInput type="number" formControlName="count" />
      </label>
      <label>
        Min
        <input type="number" formControlName="min" />
      </label>
      <label>
        Max
        <input type="number" formControlName="max" />
      </label>
      <button type="submit" class="btn primary" [disabled]="form.invalid || !api.canGenerate()">
        Generate
      </button>
    </form>

    @if (form.controls.count.invalid) {
      <small class="error">Count must be between 1 and 50.</small>
    }
    @if (form.hasError('minNotBelowMax')) {
      <small class="error">Min must be below max.</small>
    }
  `,
})
export class GeneratorForm {
  private readonly fb = inject(NonNullableFormBuilder);
  protected readonly api = inject(RandomApi);

  protected readonly form = this.fb.group(
    {
      count: [12, [Validators.required, Validators.min(1), Validators.max(50)]],
      min: [0, Validators.required],
      max: [100, Validators.required],
    },
    { validators: minBelowMax },
  );

  // viewChild by template reference name: finds the <input #countInput> in this
  // component's own template. Querying a plain HTML element gives an ElementRef,
  // and .nativeElement is the real DOM <input>, which focus() below uses.
  private readonly countInput = viewChild.required<ElementRef<HTMLInputElement>>('countInput');

  generate(): void {
    if (this.form.invalid) return;
    this.api.generate(this.form.getRawValue());
  }

  focus(): void {
    this.countInput().nativeElement.focus();
  }
}

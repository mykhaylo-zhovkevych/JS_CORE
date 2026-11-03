import { Component, inject, output } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';


export interface RndGeneratorData {
    id: string;
    values: number[];
    createdAt: string;
}

function minBelowMax(group: AbstractControl): ValidationErrors | null {
  const { min, max } = group.value;
  return min < max ? null : { minNotBelowMax: true };
}

const rndInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

@Component({
    selector: 'app-rnd-generator',
    imports: [ReactiveFormsModule],
    templateUrl: './rnd.generator.html',
})
export class RndGenerator {
    private readonly fb = inject(NonNullableFormBuilder);

    readonly generated = output<RndGeneratorData>();

protected readonly form = this.fb.group(
    {
      count: [5, [Validators.required, Validators.min(1), Validators.max(20)]],
      min: [0, Validators.required],
      max: [100, Validators.required],
    },
    { validators: minBelowMax },
  );

    protected generate(): void {
      const { count, min, max } = this.form.getRawValue();
      this.generated.emit({
        id: crypto.randomUUID(),
        values: Array.from({ length: count }, () => rndInt(min, max)),
        createdAt: new Date().toISOString(),
    });
  }
}

import { Injectable, inject, signal } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    NonNullableFormBuilder,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';

const STEPS = ['profile', 'skills', 'account'] as const;
// ---------- validators ----------

export function checkRegExp(regExp: RegExp, message: string): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const validee = regExp.test(control.value ?? '');
    if (!validee) {
      return { invalidFormat: { message } };
    }
    return null;
  };
}

export function minItems(min: number): ValidatorFn {
  return control => ((control as FormArray).length >= min ? null : { minItems: min });
}

// sits on the group, compares two of its fields (silent while the second one is empty)
export function matchFields(a: string, b: string): ValidatorFn {
  return group => {
    const second = group.get(b)?.value;
    return !second || group.get(a)?.value === second ? null : { mismatch: true };
  };
}

// ---------- error messages ----------

const MESSAGES: Record<string, (e: any) => string> = {
  required: () => 'Required',
  email: () => 'Invalid email',
  minlength: e => `At least ${e.requiredLength} characters`,
  minItems: min => `Add at least ${min}`,
  invalidFormat: e => e.message,
  mismatch: () => "Passwords don't match",
};

export function errorText(control: AbstractControl): string | null {
  if (!control.errors || !control.touched) return null;
  const [key, e] = Object.entries(control.errors)[0];
  return MESSAGES[key]?.(e) ?? key;
}

// ---------- form + steps ----------
@Injectable()
export class FormLogic {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly form = this.fb.group({
    profile: this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    }),
    skills: this.fb.array<string>([], minItems(2)),
    account: this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(16),
            checkRegExp(/\d/, 'Needs a number'),
            checkRegExp(/[A-Z]/, 'Needs an uppercase letter'),
          ],
        ],
        confirm: ['', Validators.required],
      },
      { validators: matchFields('password', 'confirm') },
    ),
  });

  readonly step = signal(0);
  readonly lastStep = STEPS.length - 1;
  readonly submitted = signal(false);

  next(): void {
    const group = this.form.controls[STEPS[this.step()]];
    if (group.invalid) {
        group.markAllAsTouched();
      return;
    }
    if (this.step() < this.lastStep) this.step.update(i => i + 1);
    else this.submitted.set(true);
  }

  back(): void {
    this.step.update(i => i - 1);
  }

  addSkill(input: HTMLInputElement): void {
    const skill = input.value.trim();
    if (skill) this.form.controls.skills.push(this.fb.control(skill));
    input.value = '';
  }

  removeSkill(i: number): void {
    this.form.controls.skills.removeAt(i);
  }
}

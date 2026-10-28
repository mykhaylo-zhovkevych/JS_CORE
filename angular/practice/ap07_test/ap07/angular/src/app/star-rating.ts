import { Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// implementing ControlValueAccessor makes it work with formControlName like a native input
@Component({
  selector: 'app-star-rating',
  template: `
    @for (star of stars; track star) {
      <button type="button" [disabled]="disabled()" (click)="select(star)" (blur)="onTouched()">
        {{ star <= value() ? '★' : '☆' }}
      </button>
    }
  `,
  // "I am a value accessor" -> formControlName finds this instead of a native one
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StarRating), multi: true }],
})

export class StarRating implements ControlValueAccessor {
  protected readonly stars = [1, 2, 3, 4, 5];
  protected readonly value = signal(0);
  protected readonly disabled = signal(false);
  
  writeValue(value: any): void {  
    this.value.set(value ?? 0);
  }

  // store it; Angular calls it when the user does something, callback is stored in this.onChange
  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  // same for touched, Angular calls it when the user does something, callback is stored in this.onTouched
  registerOnTouched(fn: () => void): void {
   this.onTouched = fn; 
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled); 
  }

  // Angular hands us these two callbacks, we call them when the user does something
  private onChange: (value: number) => void = () => {};
  protected onTouched: () => void = () => {};

  protected select(star: number): void {
    this.value.set(star);
    this.onChange(star);
  }
}

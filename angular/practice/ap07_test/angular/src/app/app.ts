import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StarRating } from './star-rating';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, JsonPipe, StarRating],
  templateUrl: './app.html',
})
export class App {
  private readonly fb = inject(NonNullableFormBuilder);

  // the form does not know (or care) which field is native and which is custom
  protected readonly form = this.fb.group({
    name: ['', Validators.required],
    rating: [0, Validators.min(1)],
  });

  protected toggleRating(): void {
    const rating = this.form.controls.rating;
    rating.disabled ? rating.enable() : rating.disable();
  }
}

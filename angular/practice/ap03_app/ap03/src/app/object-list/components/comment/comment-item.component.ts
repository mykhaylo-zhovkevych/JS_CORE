import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MyComment } from '../../objects.data';

// inline template: fine for tiny components, instead of a separate .html file
@Component({
  selector: 'my-comment-item',
  imports: [DatePipe],
  template: `
    <div class="flex items-start justify-between gap-4 rounded-md border border-slate-200 p-3">
      <div>
        <p>{{ comment().text }}</p>
        <small class="text-slate-500">{{ comment().createdAt | date: 'short' }}</small>
      </div>
      <!-- the child does NOT delete anything, it only delegates -->
      <button type="button" (click)="remove.emit(comment().id)"
              class="text-sm text-blue-500 hover:text-red-700">✕</button>
    </div>
  `,
})
export class MyCommentItemComponent {
  // parent -> child: data flows in  ( <my-comment-item [comment]="c" /> )
  // .required -> compile error if not passed
  public comment = input.required<MyComment>();

  // Child this is output send the number)
  // the generic <number> is the type of $event in the parent
  public remove = output<number>();
}

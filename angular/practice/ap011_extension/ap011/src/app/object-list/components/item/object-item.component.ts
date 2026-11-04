import { Component, inject, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ObjectStore } from '../../object.store';
import { PRIORITIES, Priority } from '../../objects.data';
import { MyCommentItemComponent } from '../comment/comment-item.component';
import { HasUnsavedChanges } from '../../unsaved-changes.guard';

// `implements HasUnsavedChanges` is the contract unsavedChangesGuard relies on:
// the guard receives THIS instance and calls hasUnsavedChanges() on it.
@Component({
  selector: 'my-object-item',
  imports: [DatePipe, RouterLink, MyCommentItemComponent],
  templateUrl: './object-item.component.html',
  styleUrl: './object-item.component.scss',
})
export class MyObjectItemComponent implements HasUnsavedChanges {
  private store = inject(ObjectStore);

  public id = input<string>();

  public object = this.store.byId(() => Number(this.id()));
  protected readonly priorities = PRIORITIES;

  // the text in the comment box. In ap03 the <input> had no state at all (#box only),
  // so there was nothing a guard could ask. Now every keystroke is kept here.
  protected readonly draft = signal('');

  // canDeactivate: something typed but not added yet = unsaved
  public hasUnsavedChanges(): boolean {
    return this.draft().trim().length > 0;
  }

  protected changePriority(priority: Priority): void {
    const current = this.object();
    if (!current || current.priority === priority) return;
    this.store.setPriority(current.id, priority);
  }

  protected addComment(): void {
    const text = this.draft().trim();
    const current = this.object();
    if (!current || !text) return;
    this.store.addComment(current.id, text);
    // saved -> nothing unsaved anymore, the guard lets you leave without asking
    this.draft.set('');
  }

  protected removeComment(commentId: number): void {
    const current = this.object();
    if (current) this.store.removeComment(current.id, commentId);
  }
}

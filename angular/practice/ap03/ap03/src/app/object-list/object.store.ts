import { Injectable, computed, signal } from '@angular/core';
import { MyComment, MyObject, Priority, myObjects } from './objects.data';

// providedIn: 'root' -> one shared instance for the whole app (a singleton),
@Injectable({ providedIn: 'root' })
export class ObjectStore {

  // private + writable: only this class can change the state for security reason
  private readonly _objects = signal<MyObject[]>(myObjects);

  // public + read-only: components can read (and react to) it, but not .set() it
  public readonly objects = this._objects.asReadonly();
  public readonly count = computed(() => this._objects().length);

  // returns a signal that re-evaluates when either the id or the objects change
  public byId(id: () => number) {
    return computed(() => this._objects().find((o) => o.id === id()));
  }

  public setPriority(id: number, priority: Priority): void {
    this.patch(id, (o) => ({ ...o, priority }));
  }

  // nested immutable update: new array -> new object -> new comments array
  public addComment(id: number, text: string): void {
    const comment: MyComment = { id: Date.now(), text, createdAt: new Date() };
    this.patch(id, (o) => ({ ...o, comments: [...o.comments, comment] }));
  }

  public removeComment(id: number, commentId: number): void {
    this.patch(id, (o) => ({ ...o, comments: o.comments.filter((c) => c.id !== commentId) }));
  }

  // shared helper: replaces ONE object, stamps updatedAt;
  // untouched objects keep their reference, so @for (track o.id) reuses their DOM
  private patch(id: number, change: (o: MyObject) => MyObject): void {
    this._objects.update((list) =>
      list.map((o) => (o.id === id ? { ...change(o), updatedAt: new Date() } : o))
    );
  }
}

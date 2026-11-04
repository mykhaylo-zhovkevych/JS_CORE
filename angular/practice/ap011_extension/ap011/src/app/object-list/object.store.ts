import { Injectable, computed, signal } from '@angular/core';
import { MyComment, MyObject, Priority, myObjects } from './objects.data';

@Injectable({ providedIn: 'root' })
export class ObjectStore {

  private readonly _objects = signal<MyObject[]>(myObjects);

  public readonly objects = this._objects.asReadonly();
  public readonly count = computed(() => this._objects().length);

  public byId(id: () => number) {
    return computed(() => this._objects().find((o) => o.id === id()));
  }

  public setPriority(id: number, priority: Priority): void {
    this.patch(id, (o) => ({ ...o, priority }));
  }

  public addComment(id: number, text: string): void {
    const comment: MyComment = { id: Date.now(), text, createdAt: new Date() };
    this.patch(id, (o) => ({ ...o, comments: [...o.comments, comment] }));
  }

  public removeComment(id: number, commentId: number): void {
    this.patch(id, (o) => ({ ...o, comments: o.comments.filter((c) => c.id !== commentId) }));
  }

  private patch(id: number, change: (o: MyObject) => MyObject): void {
    this._objects.update((list) =>
      list.map((o) => (o.id === id ? { ...change(o), updatedAt: new Date() } : o))
    );
  }
}

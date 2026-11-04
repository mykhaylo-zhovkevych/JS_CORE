import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectStore } from '../../object.store';

@Component({
  selector: 'my-object-list',
  templateUrl: './object-list.component.html',
  styleUrl: './object-list.component.scss',
})
export class MyObjectListComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private store = inject(ObjectStore);

  public myObjects = this.store.objects;

  public redirectTo(id: number): void {
    this.router.navigate([`${id}`], { relativeTo: this.route });
  }
}

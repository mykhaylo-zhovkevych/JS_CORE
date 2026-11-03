import { Component, computed, contentChildren, inject, input, model, output } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  template: `
    <p class="nav-heading">Sections ({{ count() }})</p>
    <nav>
      <ng-content />
    </nav>
  `,
  styles: `
    :host { display: block; padding: 12px 8px; }
    .nav-heading {
      margin: 0 8px 8px;
      font-size: 0.75rem;
      text-transform: uppercase;
      color: var(--muted);
    }
    nav { display: flex; flex-direction: column; gap: 2px; }
  `,
})
export class SideNav {
  // contentChildren: collects ALL NavItem instances the parent projected between
  // <app-side-nav> and </app-side-nav>, as a Signal<readonly NavItem[]>.
  // The side nav itself renders no links - it only counts and coordinates the items.
  // If the parent adds or removes an <app-nav-item> (e.g. with @if), the signal updates
  // and count() below updates with it.
  readonly items = contentChildren(NavItem);
  protected readonly count = computed(() => this.items().length);

  // model() = an input that the child is also allowed to write back to.
  // The parent binds it two-way with [(active)]="section": when the parent changes
  // `section`, active() changes here; when this component calls active.set(...),
  // Angular emits an `activeChange` event and the parent's `section` signal is updated.
  // navigate is a plain output for "the user clicked an item", so the App can scroll.
  readonly active = model<string | null>(null);
  readonly navigate = output<string>();

  select(target: string): void {
    this.active.set(target);
    this.navigate.emit(target);
  }
}

@Component({
  selector: 'app-nav-item',
  template: `
    <button class="nav-item" [class.active]="isActive()" (click)="nav.select(target())">
      <ng-content />
      @if (badge() !== undefined) {
        <span class="badge">{{ badge() }}</span>
      }
    </button>
  `,
  styles: `
    .nav-item {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 8px 10px;
      border: 0;
      border-radius: 6px;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      cursor: pointer;
    }
    .nav-item:hover { background: var(--hover); }
    .nav-item.active { background: var(--accent-soft); color: var(--accent); font-weight: 600; }
    .badge { margin-left: auto; }
  `,
})
export class NavItem {
  // The child injects its parent component: Angular's injector walks up the element
  // tree and finds the surrounding <app-side-nav> instance. That gives the item direct
  // access to nav.active() and nav.select() without any inputs/outputs in between.
  // The downside: an <app-nav-item> only works inside an <app-side-nav> - anywhere else
  // inject(SideNav) finds nothing and throws.
  protected readonly nav = inject(SideNav);

  readonly target = input.required<string>();
  readonly badge = input<string | number>();

  protected readonly isActive = computed(() => this.nav.active() === this.target());
}

import { Component, Directive, ElementRef, computed, contentChild, inject, input, signal } from '@angular/core';

@Directive({ selector: '[panelActions]' })
export class PanelActions {}

@Component({
  selector: 'app-panel',
  template: `
    <header class="panel-head" (click)="toggle()">
      <ng-content select="[panelTitle]">Untitled</ng-content>
      <span class="chevron">{{ collapsed() ? '▸' : '▾' }}</span>
    </header>

    <!--
      [hidden] instead of @if: projected content belongs to the PARENT's view, so the
      parent creates it no matter what this component does. Wrapping <ng-content> in an
      @if would not destroy that content, it would only stop showing it - and when the @if
      flips back the content does not get re-created either. Hiding the wrapper with CSS
      is the honest way to say "it exists, it is just not visible right now".
    -->
    <div class="panel-body" [hidden]="collapsed()">
      <ng-content />
    </div>

    <footer class="panel-actions" [hidden]="!showActions()">
      <ng-content select="[panelActions]" />
    </footer>
  `,
  host: { '[attr.id]': 'section()' },
  styles: `
    :host {
      display: block;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      scroll-margin-top: 8px;
    }
    .panel-head {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      cursor: pointer;
      user-select: none;
    }
    .chevron { margin-left: auto; color: var(--muted); }
    .panel-body { padding: 0 14px 14px; }
    .panel-actions {
      display: flex;
      gap: 8px;
      padding: 10px 14px;
      border-top: 1px solid var(--border);
    }
    .panel-actions[hidden] { display: none; }
  `,
})
export class Panel {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly section = input.required<string>();

  // Public signal on purpose: the DashboardPage gets every Panel instance through
  // viewChildren(Panel) and reads collapsed() to count how many panels are open.
  // Because it is a signal, any computed() on the page that reads it re-runs
  // automatically as soon as a single panel is toggled.
  readonly collapsed = signal(false);

  // contentChild looks at what the PARENT projected between <app-panel> and </app-panel>
  // and returns the first element carrying the PanelActions marker directive (or undefined).
  // The footer is only shown if there are actions AND the panel is not collapsed.

  private readonly actions = contentChild(PanelActions);
  protected readonly showActions = computed(() => !!this.actions() && !this.collapsed());

  toggle(): void {
    this.collapsed.update((c) => !c);
  }

  expand(): void {
    this.collapsed.set(false);
  }

  collapse(): void {
    this.collapsed.set(true);
  }

  reveal(): void {
    this.expand();
    this.host.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

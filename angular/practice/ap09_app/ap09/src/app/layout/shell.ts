import { Component, Directive, computed, contentChild, signal } from '@angular/core';

@Directive({ selector: '[shellAside]' })
export class ShellAside {}

@Component({
  selector: 'app-shell',
  template: `
    <header class="shell-top">
      <!--
        Fallback content: whatever is written between <ng-content> and </ng-content>
        is rendered only when the parent projects nothing that matches [shellTop].
        As soon as an element with the shellTop attribute is passed in, the
        <strong>App</strong> placeholder disappears.
      -->
      <ng-content select="[shellTop]"><strong>App</strong></ng-content>
    </header>

    <div class="shell-body" [class.no-aside]="!showAside()">
      <aside class="shell-aside" [hidden]="!showAside()">
        <ng-content select="[shellAside]" />
      </aside>

      <main class="shell-main">
        <!--
          Default slot: an <ng-content> without a select attribute catches every
          projected node that did not match any of the other select="..." slots
          (shellTop, shellAside, shellBottom). There can only be one default slot.
        -->
        <ng-content />
      </main>
    </div>

    <footer class="shell-bottom">
      <ng-content select="[shellBottom]" />
    </footer>
  `,
  styles: `
    :host {
      display: grid;
      grid-template-rows: auto 1fr auto;
      height: 100dvh;
    }
    .shell-top,
    .shell-bottom {
      background: var(--surface);
      border-color: var(--border);
      border-style: solid;
      border-width: 0;
    }
    .shell-top { border-bottom-width: 1px; }
    .shell-bottom { border-top-width: 1px; }
    .shell-body {
      display: grid;
      grid-template-columns: 220px 1fr;
      min-height: 0;
    }
    .shell-body.no-aside { grid-template-columns: 1fr; }
    .shell-aside {
      background: var(--surface);
      border-right: 1px solid var(--border);
      overflow: auto;
    }
    .shell-main {
      overflow: auto;
      padding: 16px;
    }
    @media (max-width: 700px) {
      .shell-body { grid-template-columns: 1fr; grid-template-rows: auto 1fr; }
      .shell-aside { border-right: 0; border-bottom: 1px solid var(--border); }
    }
  `,
})
export class Shell {
  // contentChild: searches what the PARENT projected between <app-shell> and </app-shell>,
  // NOT this component's own template (that would be viewChild).
  // It looks for the ShellAside marker directive, which does nothing by itself - it only
  // exists so there is something to search for. The result is undefined when no element
  // with the shellAside attribute was passed in, so the shell can drop the aside column.
  private readonly aside = contentChild(ShellAside);
  protected readonly hasAsideBool = computed(() => !!this.aside());

  private readonly asideOpen = signal(true);
  protected readonly showAside = computed(() => this.hasAsideBool() && this.asideOpen());

  toggleAside(): void {
    this.asideOpen.update((open) => !open);
  }
}

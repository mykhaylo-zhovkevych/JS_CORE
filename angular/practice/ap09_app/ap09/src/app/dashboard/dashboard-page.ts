import { Component, computed, effect, inject, output, untracked, viewChild, viewChildren } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RandomApi } from '../core/random-api';
import { Panel, PanelActions } from '../ui/panel';
import { ValueBars } from '../ui/value-bars';
import { GeneratorForm } from './generator-form';
import { RequestForm } from './request-form';
import { HistoryList } from './history-list';

@Component({
  selector: 'app-dashboard-page',
  imports: [Panel, PanelActions, ValueBars, GeneratorForm, RequestForm, HistoryList, JsonPipe],
  template: `
    <div class="toolbar">
      <span class="muted">{{ openCount() }} / {{ panels().length }} panels open</span>
      <span class="spacer"></span>
      <button class="btn" (click)="expandAll()" [disabled]="allOpen()">Expand all</button>
      <button class="btn" (click)="collapseAll()" [disabled]="openCount() === 0">Collapse all</button>
    </div>

    <app-panel section="generate">
      <h2 panelTitle>1. Generate</h2>
      <app-generator-form />
      <app-value-bars [values]="api.data()?.values ?? []" />
    </app-panel>

    <app-panel section="send">
      <h2 panelTitle>2. Send</h2>
      <app-request-form />
    </app-panel>

    <app-panel section="response">
      <h2 panelTitle>3. Response</h2>
      @switch (api.step()) {
        @case ('sending') {
          <p class="muted">Waiting for the server…</p>
        }
        @case ('failed') {
          <p class="error">{{ api.error() }}</p>
        }
        @case ('done') {
          <pre>{{ api.response() | json }}</pre>
        }
        @default {
          <p class="muted">Nothing sent yet.</p>
        }
      }
      <!--
        The panelActions attribute does two things: it routes these buttons into the
        panel's <ng-content select="[panelActions]"> slot (the footer), and it puts the
        PanelActions marker directive on them. The panel finds that directive with
        contentChild and only shows its footer when at least one action was projected.
        The "Send" and "Generate" panels pass no actions, so they have no footer at all.
      -->
      <button panelActions class="btn" (click)="regenerate()" [disabled]="!api.canGenerate()">
        Regenerate
      </button>
      <button panelActions class="btn" (click)="startOver()">Start over</button>
    </app-panel>

    <app-panel section="history">
      <h2 panelTitle>History</h2>
      <app-history-list />
      <button
        panelActions
        class="btn"
        (click)="api.clearHistory()"
        [disabled]="!api.history().length"
      >
        Clear history
      </button>
    </app-panel>
  `,
  host: { class: 'dashboard' },
})
export class DashboardPage {
  protected readonly api = inject(RandomApi);

  readonly sectionChange = output<string>();

  // viewChildren by component type: returns every Panel instance in this component's
  // own template - here all four <app-panel>s - as a Signal<readonly Panel[]>.
  // We get the component instances (not DOM elements), so we can call their public
  // methods (expand, collapse, reveal) and read their public signals (collapsed, section).
  protected readonly panels = viewChildren(Panel);

  // viewChild by component type: the single GeneratorForm instance in the template.
  // Through it the page can call generate() and focus() on the form directly,
  // e.g. for the "Regenerate" and "Start over" buttons in the response panel.
  private readonly generator = viewChild.required(GeneratorForm);

  // computed over a query result. It tracks two kinds of signals at once:
  //  - panels(): changes when panels are added to or removed from the template
  //  - p.collapsed() of every panel: changes when a single panel is toggled
  // Because Panel.collapsed is a signal too, the counter in the toolbar updates
  // even when the user just clicks one panel header - no events or outputs needed.
  protected readonly openCount = computed(() => this.panels().filter((p) => !p.collapsed()).length);
  protected readonly allOpen = computed(() => this.openCount() === this.panels().length);

  constructor() {
    // Guide the user through the flow automatically:
    //  - after generating data ('generated')       -> open and scroll to the "Send" panel
    //  - after the request finished ('done'/'failed') -> open and scroll to the "Response" panel
    //  - every other step ('idle', 'sending')      -> do nothing
    effect(() => {
      const step = this.api.step();
      const target = step === 'generated' ? 'send' : step === 'done' || step === 'failed' ? 'response' : null;
      // untracked(): an effect tracks EVERY signal it reads, including signals read inside
      // functions it calls. reveal() reads panels() and the panel's signals, so without
      // untracked the effect would also re-run whenever the panel list changed and could
      // scroll the user around unexpectedly. Inside untracked() reads are not tracked,
      // so the effect depends on api.step() only.
      if (target) untracked(() => this.reveal(target));
    });
  }

  reveal(section: string): void {
    this.panels().find((p) => p.section() === section)?.reveal();
    this.sectionChange.emit(section);
  }

  protected expandAll(): void {
    this.panels().forEach((p) => p.expand());
  }

  protected collapseAll(): void {
    this.panels().forEach((p) => p.collapse());
  }

  protected regenerate(): void {
    this.generator().generate();
  }

  protected startOver(): void {
    this.api.reset();
    this.reveal('generate');
    this.generator().focus();
  }
}

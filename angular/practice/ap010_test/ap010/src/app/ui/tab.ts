import { Component, computed, inject, input } from "@angular/core";
import { Tabs } from "./tabs";

@Component({
  selector: 'ui-tab',
  template: `
    <div class="tab-body">
      <ng-content />
    </div>
  `,
  host: {
    role: 'tabpanel',
    '[hidden]': '!isActive()',
  },
  styles: `
    /* 22.3 - this component's PUBLIC styling API: CSS variables with defaults.
       A parent cannot reach .tab-body with a normal selector (encapsulation), but it
       can set --tab-body-bg / --tab-body-padding / --tab-body-border on <ui-tab> or on
       any ancestor, and the values are inherited down to here. */
    .tab-body {
      padding: var(--tab-body-padding, 12px 2px);
      background: var(--tab-body-bg, transparent);
      border: var(--tab-body-border, 0);
      border-radius: var(--radius);
    }
  `,
})
export class Tab {
  private readonly tabs = inject(Tabs);

  readonly label = input.required<string>();
  protected readonly isActive = computed(() => this.tabs.current() === this.label());
}

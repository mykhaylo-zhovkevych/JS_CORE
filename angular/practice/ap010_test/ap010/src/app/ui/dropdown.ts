import { Component, input, model } from '@angular/core';
import { ClickOutside } from '../directives/click-outside';
import { Button } from './button';

@Component({
  selector: 'ui-dropdown',
  imports: [ClickOutside, Button],
  template: `
    <!-- The click-outside directive sits on the wrapper that contains BOTH the trigger
         and the menu. Clicking the trigger is "inside", so it does not instantly close
         the menu it just opened. Any click elsewhere on the page closes it. -->
    <div class="dropdown" appClickOutside (clickOutside)="open.set(false)">
      <button uiButton type="button" [attr.aria-expanded]="open()" (click)="open.set(!open())">
        {{ label() }} <span aria-hidden="true">{{ open() ? '▴' : '▾' }}</span>
      </button>

      @if (open()) {
        <!-- A click on any menu item bubbles up to this div and closes the menu.
             The item's own (click) handler in the parent runs first. -->
        <div class="menu" role="menu" (click)="open.set(false)">
          <ng-content />
        </div>
      }
    </div>
  `,
  styles: `
    .dropdown { position: relative; display: inline-block; }
    .menu {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      min-width: 180px;
      display: flex;
      flex-direction: column;
      padding: 4px;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: var(--surface);
      box-shadow: 0 8px 24px rgb(0 0 0 / 0.15);
      z-index: 20;
    }

    /* The menu items are PROJECTED buttons: they were written in the parent's template
       and carry the parent's _ngcontent attribute, not ours. A plain ".menu button"
       would never match them. ::ng-deep switches off the rewriting for everything after
       it, and putting :host first keeps the rule limited to this component.
       This is the deprecated-but-working way (22.3); the tabs show the CSS-variable way. */
    :host ::ng-deep .menu > * {
      padding: 6px 10px;
      border: 0;
      border-radius: 6px;
      background: none;
      color: inherit;
      font: inherit;
      text-align: left;
      cursor: pointer;
    }
    :host ::ng-deep .menu > *:hover { background: var(--hover); }
  `,
})
export class Dropdown {
  readonly label = input('Menu');
  readonly open = model(false);
}

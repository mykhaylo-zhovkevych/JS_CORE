import { Component, ViewEncapsulation, input } from '@angular/core';

const CARD_TEMPLATE = `
  <h3>{{ title() }}</h3>
  <p class="meta">lorem: <code>{{ mode }}</code></p>
  <div class="card-body">
    <ng-content />
  </div>
  <footer class="card-footer">
    <ng-content select="[cardFooter]">lorem ipsum dolor sit</ng-content>
  </footer>
`;

const CARD_BOX = `
  display: block;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
`;

// Class names are prefixed with "card-" on purpose: the None version leaks EVERY rule,
// and a generic ".body" or ".footer" would start styling unrelated elements on the page.
const CARD_BASE_STYLES = `
  .meta { font-size: 0.8rem; color: var(--muted); margin: 2px 0 10px; }
  .card-footer { margin-top: 10px; padding-top: 8px; border-top: 1px dashed var(--border); font-size: 0.85rem; color: var(--muted); }
`;

// 1) Emulated (the default - you get it even without writing `encapsulation`)
// Angular rewrites every selector so it only matches this component's elements:
//   h3 { color: teal }   ->   h3[_ngcontent-abc-c12] { color: teal }
// and every element in THIS template gets the matching _ngcontent-abc-c12 attribute.
// Result: styles do not leak out. Global styles still come IN (it is normal DOM).
@Component({
  selector: 'ui-card-emulated',
  template: CARD_TEMPLATE,
  encapsulation: ViewEncapsulation.Emulated,
  styles: [`:host { ${CARD_BOX} }`, CARD_BASE_STYLES, `h3 { color: teal; }`],
})
export class CardEmulated {
  readonly title = input.required<string>();
  protected readonly mode = 'Emulated';
}

// 2) None
// No rewriting at all: the CSS is added to <head> exactly as written, so it behaves
// like global CSS. "h3 { color: crimson }" now hits EVERY <h3> on the page - look at
// the innocent h3 below the cards, and at the other two cards' headings.
@Component({
  selector: 'ui-card-none',
  template: CARD_TEMPLATE,
  encapsulation: ViewEncapsulation.None,
  // :host does not work with None: without encapsulation there is no _nghost
  // attribute to translate :host into, so we style the tag name instead.
  styles: [`ui-card-none { ${CARD_BOX} }`, CARD_BASE_STYLES, `h3 { color: crimson; }`],
})
export class CardNone {
  readonly title = input.required<string>();
  protected readonly mode = 'None';
}

import { Directive, ElementRef, inject, output } from '@angular/core';

// Usage:  <div appClickOutside (clickOutside)="close()"> ... </div>
//
// Emits whenever the user clicks anywhere on the page EXCEPT inside the host element.
// A normal '(click)' listener on the host cannot do this - it only hears clicks that
// happen inside the host. So we listen on the whole document and check where the
// click happened.
@Directive({
  selector: '[appClickOutside]',
  host: {
    // 21.2 - 'document:click' attaches ONE listener to `document` per directive instance.
    // Angular removes it automatically when the directive is destroyed, so there is no
    // leak even if the host element is created and destroyed many times (e.g. inside @if).
    // $event is the native MouseEvent, passed into the method.
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class ClickOutside {
  // ElementRef of the HOST element: needed to ask "is the clicked element inside me?"
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly clickOutside = output<MouseEvent>();

  protected onDocumentClick(event: MouseEvent): void {
    // Node.contains() is true for the host itself and for every element nested in it.
    // event.target is typed as EventTarget, so we tell TS it is a Node.
    const clickedInside = this.host.nativeElement.contains(event.target as Node);
    if (!clickedInside) this.clickOutside.emit(event);
  }
}

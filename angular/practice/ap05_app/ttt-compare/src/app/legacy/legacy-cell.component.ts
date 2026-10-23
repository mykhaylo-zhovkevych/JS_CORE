import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Cell } from '../shared/game.logic';
import  { countLegacyCells } from '../shared/check-counter';

// OLD: @Input, and @Output decorators, and EventEmitter
@Component({
    selector: 'legacy-cell',
    standalone: false,
    changeDetection: ChangeDetectionStrategy.Eager,
    template: `
        <button class="cell" (click)="play.emit()" [disabled]="!!value">{{value}}</button>
        {{count()}}
    `
})
export class LegacyCellComponent {
    @Input() value: Cell | null = null;
    @Output() play = new EventEmitter<void>();

    count = countLegacyCells;
}

import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Cell } from '../shared/game.logic';
import { countModernCells } from '../shared/check-counter';

// New: input() / output() functions, standalone by default (OnPush only becomes the default in v22)
@Component({
    selector: 'modern-cell',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <button class="cell" (click)="play.emit()" [disabled]="!!value()">{{value()}}</button>
    {{ count() }}    
    `
})
export class ModernCellComponent {
    value = input.required<Cell>();
    play = output<void>();

    count = countModernCells;
}

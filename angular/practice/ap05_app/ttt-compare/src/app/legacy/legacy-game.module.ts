import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegacyBoardComponents } from './legacy-board.component';
import { LegacyCellComponent } from './legacy-cell.component';
import { LegacyGameService } from './legacy-game.service';

// OLD: every component had to be declared in a module,
// and the module had to import what the templates use (CommonModule for *ngIf/*ngFor).
@NgModule({
  declarations: [LegacyBoardComponents, LegacyCellComponent],
  imports: [CommonModule],
  providers: [LegacyGameService],
  exports: [LegacyBoardComponents],
})
export class LegacyGameModule {}

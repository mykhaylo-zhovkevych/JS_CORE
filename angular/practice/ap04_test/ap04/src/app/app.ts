import { Component, signal } from '@angular/core';
import { PipesComponent } from './components/pipes.components';
import { PostListComponent } from './request/components/post-list/post-list.component';
import { UserProgressComponent } from './request/components/user-progress/user-progress.component';

@Component({
  selector: 'app-root',
  imports: [PipesComponent, UserProgressComponent, PostListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ap04');
}

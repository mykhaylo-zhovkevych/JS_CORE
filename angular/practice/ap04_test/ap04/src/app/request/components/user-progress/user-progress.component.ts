import { Component, inject } from '@angular/core';
import { AsyncPipe, PercentPipe, UpperCasePipe } from '@angular/common';
import { PostService } from '../../services/post.service';
import { InitialsPipe } from '../../../pipes/initials.pipe';

// component 2 of 2 that shares PostService — styling: USE CASE 02
@Component({
    selector: 'app-user-progress',
    imports: [AsyncPipe, PercentPipe, UpperCasePipe, InitialsPipe],
    templateUrl: './user-progress.component.html',
    styleUrl: './user-progress.component.scss',
})
export class UserProgressComponent {
    private readonly postService = inject(PostService);

    readonly rows$ = this.postService.userProgress$;
}

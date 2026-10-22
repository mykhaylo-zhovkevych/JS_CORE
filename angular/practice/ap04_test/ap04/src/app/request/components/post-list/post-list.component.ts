import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, DecimalPipe, LowerCasePipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { PostService } from '../../services/post.service';
import { InitialsPipe } from '../../../pipes/initials.pipe';
import { TruncatePipe } from '../../../pipes/truncate.pipe';

// component 1 of 2 that shares PostService — styling: USE CASE 01
@Component({
    selector: 'app-post-list',
    imports: [AsyncPipe, DecimalPipe, LowerCasePipe, SlicePipe, TitleCasePipe, InitialsPipe, TruncatePipe],
    templateUrl: './post-list.component.html',
    styleUrl: './post-list.component.scss',
})
export class PostListComponent {
    private readonly postService = inject(PostService);

    // the async pipe subscribes in the template and unsubscribes on destroy
    readonly posts$ = this.postService.postsWithAuthors$;

    // used by the slice pipe: posts | slice: 0 : limit()
    readonly limit = signal(6);

    showMore() {
        this.limit.update(n => n + 6);
    }
}

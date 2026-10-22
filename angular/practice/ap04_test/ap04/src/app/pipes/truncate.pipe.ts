import { Pipe, PipeTransform } from '@angular/core';

// custom pipe: {{ text | truncate }}  or  {{ text | truncate: 40 : ' ...' }}
// every argument after the ':' becomes the next parameter of transform()
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
    transform(value: string | null | undefined, limit = 60, suffix = '…'): string {
        if (!value) return '';
        return value.length > limit ? value.slice(0, limit).trimEnd() + suffix : value;
    }
}

import { Pipe, PipeTransform } from '@angular/core';

// custom pipe: {{ 'Leanne Graham' | initials }} -> "LG"
// pipes are pure by default: transform() only runs again when the input value changes
@Pipe({ name: 'initials' })
export class InitialsPipe implements PipeTransform {
    transform(value: string | null | undefined, max = 2): string {
        if (!value) return '?';
        return value
            .split(/\s+/)
            .filter(word => word && !word.endsWith('.'))   // skip titles like "Mrs." / "Dr."
            .slice(0, max)
            .map(word => word[0].toUpperCase())
            .join('');
    }
}

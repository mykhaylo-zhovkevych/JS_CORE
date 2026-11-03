import { Component, signal } from '@angular/core';
import { RndGenerator, RndGeneratorData } from '../rnd-generator/rnd-generator';
import { RequestForm } from '../request-form/request-form';

@Component({
    selector: 'app-forms-page',
    imports: [RndGenerator, RequestForm],
    template: `
        <app-rnd-generator (generated)="randomData.set($event)"></app-rnd-generator>
        <app-request-form [data]="randomData()"></app-request-form>
    `,
    host: { class: 'flex flex-col gap-4' },
})
export class FormsPage {
    protected readonly randomData = signal<RndGeneratorData | null>(null);
}

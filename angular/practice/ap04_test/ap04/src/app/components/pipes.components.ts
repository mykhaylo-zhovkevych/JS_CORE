import { Component } from '@angular/core';
import {
    CurrencyPipe, DatePipe, DecimalPipe, JsonPipe, KeyValuePipe,
    LowerCasePipe, PercentPipe, SlicePipe, TitleCasePipe, UpperCasePipe,
} from '@angular/common';
import { InitialsPipe } from '../pipes/initials.pipe';
import { TruncatePipe } from '../pipes/truncate.pipe';

// standalone components must import every pipe they use in the template
@Component({
    selector: 'app-pipes',
    imports: [
        DatePipe, UpperCasePipe, LowerCasePipe, TitleCasePipe, CurrencyPipe, PercentPipe,
        DecimalPipe, SlicePipe, JsonPipe, KeyValuePipe, InitialsPipe, TruncatePipe,
    ],
    templateUrl: './pipes.components.html',
    styleUrl: './pipes.components.scss',
})
export class PipesComponent {
    public name = "mikhAyL";
    public surname = "kOzAKK";

    // DatePipe needs a Date / timestamp / ISO string, not toDateString()
    public date = new Date();

    public price = 1234.5;
    public rate = 0.2567;
    public bigNumber = 1234567.891;
    public tags = ['angular', 'pipes', 'scss', 'rxjs', 'signals'];
    public sentence = 'Pipes transform values in the template without changing the data in the component.';
    public profile = { city: 'Zürich', role: 'student', level: 3 };
}

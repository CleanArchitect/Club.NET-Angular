import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CleanTableColumnNumber } from '../../..';
import { CleanTableColumnComponent } from '../column.component';

@Component({
    selector: 'clean-table-column-number',
    templateUrl: 'number.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatProgressBarModule]
})
export class CleanTableColumnNumberComponent extends CleanTableColumnComponent<CleanTableColumnNumber<any>> { }
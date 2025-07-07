import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CleanTableColumnDate } from '../../../models/columns/date';
import { CleanTableColumnComponent } from '../column.component';

@Component({
    selector: 'clean-table-column-date',
    templateUrl: 'date.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CleanTableColumnDateComponent extends CleanTableColumnComponent<CleanTableColumnDate<any>> { }
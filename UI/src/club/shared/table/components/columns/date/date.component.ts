import { Component } from '@angular/core';
import { CleanTableColumnDate } from '../../../models/columns/date.column';
import { CleanTableColumnComponent } from '../column.component';

@Component({
    selector: 'clean-table-column-date',
    templateUrl: 'date.component.html'
})
export class CleanTableColumnDateComponent extends CleanTableColumnComponent<CleanTableColumnDate<any>> { }
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CleanTableColumnArray } from '../../../models/columns/array.column';
import { CleanArrayPipe } from '../../../pipes/array.pipe';
import { CleanTableColumnComponent } from '../column.component';

@Component({
    selector: 'clean-table-column-array',
    templateUrl: 'array.component.html',
    styleUrl: 'array.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, CleanArrayPipe, MatChipsModule, MatIconModule]
})
export class CleanTableColumnArrayComponent extends CleanTableColumnComponent<CleanTableColumnArray<any>> { }
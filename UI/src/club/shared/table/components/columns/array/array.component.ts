import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CleanTableColumnArray } from '../../../models/columns/array.column';
import { CleanTableColumnComponent } from '../column.component';

@Component({
    selector: 'clean-table-column-array',
    templateUrl: 'array.component.html',
    styleUrl: 'array.component.scss',
    imports: [CommonModule, MatChipsModule, MatIconModule]
})
export class CleanTableColumnArrayComponent extends CleanTableColumnComponent<CleanTableColumnArray<any>> {
    selectedItem: any;

    get displayValues(): string[] {
        return this.column
            .value(this.rowElement)
            .map(value => this.column.displayWith(value));
    }
}
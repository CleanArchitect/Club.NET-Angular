import { CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CleanTableColumn, ICleanTableConfig } from '../..';

@Component({
    selector: 'clean-table-configuration[config][columns]',
    templateUrl: 'configuration.component.html',
    styleUrl: './configuration.component.scss',
    host: { 'class': 'clean-table-configuration'},
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, FormsModule, MatButtonModule, MatDividerModule, MatCardModule, MatIconModule, MatSlideToggleModule, MatListModule, CdkDrag, CdkDropList, CdkDragPlaceholder]
})
export class CleanTableConfigurationComponent {
    @Input() config: ICleanTableConfig;
    @Input() columns: CleanTableColumn<any>[] = [];

    @Output() readonly configChange = new EventEmitter<ICleanTableConfig>();
    @Output() readonly columnsChange = new EventEmitter<CleanTableColumn<any>[]>();

    drop(event: CdkDragDrop<CleanTableColumn<any>[]>) {
        moveItemInArray(this.columns, event.previousIndex, event.currentIndex);

        this.columns.forEach((col, index) => col.order = index);

        this.columnsChange.emit(this.columns);
    }

    toggleColumnVisibility(column: CleanTableColumn<any>) {
        column.visible = !column.visible;

        this.columnsChange.emit(this.columns);
    }
}
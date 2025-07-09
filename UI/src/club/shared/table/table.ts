import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, inject, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CleanResizeDirective, CleanTable, CleanTableAppearance, CleanTableColumn, CleanTableColumnComponentDirective, CleanTableEvent, CleanTableHeaderComponents, ICleanTableConfig } from '.';

@Component({
    selector: 'clean-table[data][columns]',
    templateUrl: 'table.html',
    styleUrl: 'table.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {'class': 'clean-table'},
    imports: [CommonModule, CleanTableHeaderComponents, CleanTableColumnComponentDirective, CleanResizeDirective, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule]
})
export class CleanTableComponent<TRowElement> implements OnInit, OnChanges, AfterViewInit {
    private hostElement = inject<ElementRef<HTMLElement>>(ElementRef);

    @Input() data: TRowElement[];
    @Input() columns: CleanTableColumn<TRowElement>[];
    @Input() config: ICleanTableConfig = {};
    @Input() appearance: CleanTableAppearance = 'fill';

    @Output() readonly modified = new EventEmitter<CleanTableEvent>();
    @Output() readonly page = new EventEmitter<PageEvent>();

    @ViewChild(MatPaginator) private paginator: MatPaginator;
    @ViewChild(MatSort) private sort: MatSort;

    @HostBinding('attr.appearance') get hostAppearance(): string {
        return this.appearance;
    }

    readonly table: CleanTable<TRowElement> = new CleanTable();

    ngOnInit(): void {
        this.table.update(this.data, this.columns);
    }

    ngOnChanges(): void {
        if (this.data && this.columns)
            this.table.update(this.data, this.columns);
    }

    ngAfterViewInit(): void {
        this.table
            .addPaginator(this.paginator)
            .addSort(this.sort);
    }

    fullscreen(): void {
        this.hostElement.nativeElement.requestFullscreen();
    }

    export(): void {
        this.table
            .export()
            .toExcel(`table-export.xlsx`);
    }

    log(event: any): void {
        console.log(event);
    }
}
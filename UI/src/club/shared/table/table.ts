import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { CleanTableHeaderComponents } from './components/header/header';
import { ICleanTableConfig } from './config/table.config';
import { CleanTableColumnComponentDirective } from './directives/column.directive';
import { CleanResizeDirective } from './directives/resize/resize.directive';
import { CleanTableColumn } from './models/columns/column';
import { CleanTableEvent } from './models/events/table.event';

class CleanTableColumns<TRowElement> {
    actionsName = 'actions';

    get names(): string[] {
        return [...this.visible.map(column => column.name), this.actionsName];
    }

    get visible(): CleanTableColumn<TRowElement>[] {
        return this.columns.filter(column => column.visible);
    }

    constructor(public columns: CleanTableColumn<TRowElement>[] = []) { }

    update(columns: CleanTableColumn<TRowElement>[]): void {
        this.columns = columns;
    }
}

class CleanTable<TRowElement> {
    readonly dataSource: MatTableDataSource<TRowElement> = new MatTableDataSource();
    readonly columns: CleanTableColumns<TRowElement> = new CleanTableColumns();

    constructor() {
        this.dataSource.filterPredicate = (rowElement, filter) => 
            this.filterPredicate(rowElement, filter);
    }

    update(data: TRowElement[], columns: CleanTableColumn<TRowElement>[]): void {
        this.dataSource.data = data;
        this.columns.update(columns);
        this.dataSource.paginator?.firstPage();
    }

    filter(value: string): void {
        this.dataSource.filter = value
            ?.trim()
            .toLowerCase();
    }

    addPaginator(paginator: MatPaginator): this {
        this.dataSource.paginator = paginator;
        return this;
    }

    addSort(sort: MatSort): this {
        this.dataSource.sort = sort;
        this.dataSource.sortingDataAccessor = (rowElement, columnName) =>
            this.columns.columns.find(column => column.name === columnName).sortBy(rowElement);
        return this;
    }

    export(): CleanTableExport {
        const rowElements = this.dataSource.filteredData || this.dataSource.data;

        const exportRowElements = rowElements
            .map(rowElement => Object
                .fromEntries(this.columns.visible
                    .map(column => [column.name, column.exportAs(rowElement)])));

        return new CleanTableExport(exportRowElements);
    }

    private filterPredicate(rowElement: TRowElement, filter: string): boolean {
        return this.columns.visible.some(column => column
            .filterBy(rowElement)
            ?.toLowerCase()
            .includes(filter?.toLowerCase()));
    };
}

class CleanTableExport {
    constructor(private exportRowElements: { [key: string]: string; }[]) { }

    toExcel(filename?: string): void {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(this.exportRowElements);

        XLSX.utils.book_append_sheet(workbook, worksheet);

        const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }) as Uint8Array;

        saveAs(this.createBlob(buffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'), filename);
    }
    
    private createBlob(parts: BlobPart, mimeType: string): Blob {
        return new Blob([parts], { type: mimeType });
    }
}

@Component({
    selector: 'clean-table[data][columns]',
    templateUrl: 'table.html',
    styleUrl: 'table.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, CleanTableHeaderComponents, CleanTableColumnComponentDirective, CleanResizeDirective, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule]
})
export class CleanTableComponent<TRowElement> implements OnInit, OnChanges, AfterViewInit {
    private hostElement = inject<ElementRef<HTMLElement>>(ElementRef);

    @Input() data: TRowElement[];
    @Input() columns: CleanTableColumn<TRowElement>[];
    @Input() config: ICleanTableConfig = {};

    @Output() readonly modified = new EventEmitter<CleanTableEvent>();
    @Output() readonly page = new EventEmitter<PageEvent>();

    @ViewChild(MatPaginator) private paginator: MatPaginator;
    @ViewChild(MatSort) private sort: MatSort;

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
}
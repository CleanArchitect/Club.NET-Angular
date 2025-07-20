import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CleanTableColumn } from '../columns/column';
import { CleanTableColumns } from './table.columns';
import { CleanTableExport } from './table.export';

export class CleanTable<TRowElement> {
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
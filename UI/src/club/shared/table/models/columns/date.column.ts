import { DatePipe } from '@angular/common';
import { inject } from '@angular/core';
import { CleanTableColumnDateComponent } from '../../components/columns/date/date.component';
import { CleanTableColumn, CleanTableColumnKeySubset } from './column';

export class CleanTableColumnDate<TRowElement> extends CleanTableColumn<TRowElement, Date> {
    private datePipe = inject(DatePipe);

    dateOptions: {
        format: string;
        timezone?: string;
        locale?: string;
    }

    constructor(
        value: (rowElement: TRowElement) => Date,
        name: string,
        options?: Partial<Pick<CleanTableColumnDate<TRowElement>, 'dateOptions' | CleanTableColumnKeySubset>>
    ) {
        super(value, name, CleanTableColumnDateComponent, options);

        Object.assign(this, options);
    }

    format = (rowElement: TRowElement): string => this.datePipe.transform(this.value(rowElement), this.dateOptions?.format, this.dateOptions?.timezone, this.dateOptions?.locale);

    override sortBy = (rowElement: TRowElement): string | number => this.value(rowElement).getTime();
    override filterBy = (rowElement: TRowElement): string => this.format(rowElement) ?? '';
    override exportAs = (rowElement: TRowElement): string => this.format(rowElement) ?? '';
}
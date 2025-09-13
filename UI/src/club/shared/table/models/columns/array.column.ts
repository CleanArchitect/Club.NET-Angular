import { inject } from '@angular/core';
import { CleanTableColumnArrayComponent } from '../../components/columns/array/array.component';
import { CleanArrayPipe } from '../../pipes/array.pipe';
import { CleanTableColumn, CleanTableColumnKeySubset } from './column';

export class CleanTableColumnArray<TRowElement, TValue = any> extends CleanTableColumn<TRowElement, Array<TValue>> {
    private arrayPipe = inject(CleanArrayPipe);

    displayWith = (value: TValue) => value?.toString();
    itemClick: (rowElement: TRowElement, value: TValue) => void;
    bulletIcon: string;

    constructor(
        value: (rowElement: TRowElement) => Array<TValue>,
        name: string,
        public style: 'commas' | 'multi-line' | 'bulleted' | 'numbered' | 'chips',
        options?: Partial<Pick<CleanTableColumnArray<TRowElement, TValue>, CleanTableColumnKeySubset | 'displayWith' | 'itemClick' | 'bulletIcon'>>
    ) {
        super(value, name, CleanTableColumnArrayComponent, options);

        Object.assign(this, options);
    }

    override hasValue = (rowElement: TRowElement): boolean => this.value(rowElement)?.length > 0;
    
    override exportAs = (rowElement: TRowElement): string => {
        const arrayValues = this.value(rowElement);

        switch (this.style) {
            case 'chips': return `[${this.arrayPipe.transform(arrayValues.map(value => this.displayWith(value)), '] [')}]`;
            case 'commas': return this.arrayPipe.transform(arrayValues.map(value => this.displayWith(value), ', '));
            case 'bulleted':
            case 'numbered':
            case 'multi-line': return this.arrayPipe.transform(arrayValues.map(value => this.displayWith(value), '\n'));
        }
    }
}

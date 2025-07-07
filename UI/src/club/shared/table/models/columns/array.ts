import { inject } from '@angular/core';
import { CleanTableColumnArrayComponent } from '../../components/columns/array/array.component';
import { CleanArrayPipe } from '../../pipes/array.pipe';
import { CleanTableColumn, CleanTableColumnKeySubset } from './column';

export class CleanTableColumnArray<TRowElement> extends CleanTableColumn<TRowElement, Array<string | number>> {
    private arrayPipe = inject(CleanArrayPipe);

    constructor(
        value: (rowElement: TRowElement) => Array<string | number>,
        name: string,
        public style: 'commas' | 'multi-line' | 'bulleted' | 'numbered' | 'chips',
        options?: Partial<Pick<CleanTableColumnArray<TRowElement>, CleanTableColumnKeySubset>>
    ) {
        super(value, name, CleanTableColumnArrayComponent, options);

        Object.assign(this, options);
    }

    override hasValue = (rowElement: TRowElement): boolean => this.value(rowElement)?.length > 0;
    override exportAs = (rowElement: TRowElement): string => {
        const arrayValues = this.value(rowElement);

        switch (this.style) {
            case 'chips': return `[${this.arrayPipe.transform(arrayValues, '] [')}]`;
            case 'commas': return this.arrayPipe.transform(arrayValues, ', ');
            case 'bulleted':
            case 'numbered':
            case 'multi-line': return this.arrayPipe.transform(arrayValues, '\n');
        }
    }
}

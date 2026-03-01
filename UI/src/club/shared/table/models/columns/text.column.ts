import { Guid } from 'guid-typescript';
import { CleanTableColumnTextComponent } from '../../components/columns/text/text.component';
import { CleanTableColumn, CleanTableColumnKeySubset } from './column';

export const textColumn = <TRowElement>(
    value: (rowElement: TRowElement) => string | number | Guid,
    name: string,
    options?: Partial<Pick<CleanTableColumnText<TRowElement>, CleanTableColumnKeySubset>>
) => new CleanTableColumnText(value, name, options);

export class CleanTableColumnText<TRowElement> extends CleanTableColumn<TRowElement, string | number | Guid> {
    constructor(
        value: (rowElement: TRowElement) => string | number | Guid,
        name: string,
        options?: Partial<Pick<CleanTableColumnText<TRowElement>, CleanTableColumnKeySubset>>
    ) {
        super(value, name, CleanTableColumnTextComponent, options);
    }
}

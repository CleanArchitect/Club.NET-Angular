import { CleanTableColumnTextComponent } from '../../components/columns/text/text.component';
import { CleanTableColumn, CleanTableColumnKeySubset } from './column';

export class CleanTableColumnText<TRowElement> extends CleanTableColumn<TRowElement, string | number> {
    constructor(
        value: (rowElement: TRowElement) => string | number,
        name: string,
        options?: Partial<Pick<CleanTableColumnText<TRowElement>, CleanTableColumnKeySubset>>
    ) {
        super(value, name, CleanTableColumnTextComponent, options);
    }
}

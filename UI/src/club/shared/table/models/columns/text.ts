import { CleanTableColumnTextComponent } from '../../components/columns/text/text.component';
import { CleanTableColumn, CleanTableColumnKeySubset } from './column';

export class CleanTableColumnText<TRowElement> extends CleanTableColumn<TRowElement, string> {
    constructor(
        value: (rowElement: TRowElement) => string,
        name: string,
        options?: Partial<Pick<CleanTableColumnText<TRowElement>, CleanTableColumnKeySubset>>
    ) {
        super(value, name, CleanTableColumnTextComponent, options);
    }
}

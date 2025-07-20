import { CleanTableColumn } from '../columns/column';

export class CleanTableColumns<TRowElement> {
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

import { ComponentType } from '@angular/cdk/portal';
import { CleanTableColumnComponent } from '../../components/columns/column.component';

type ValidateKeys<T, U extends keyof T> = U;

export type CleanTableColumnKeySubset = ValidateKeys<CleanTableColumn<any, any>, 'visible' | 'sortable' | 'click' | 'cssClass' | 'width' | 'emptyPlaceholder'>;

export class CleanTableColumn<TRowElement, TValue = any> {
    visible: boolean = true;
    sortable: boolean = true;
    cssClass: string | string[] | Set<string> | { [key: string]: any; };
    width: string = 'auto';
    order: number;
    emptyPlaceholder = '-';

    constructor(
        public value: (rowElement: TRowElement) => TValue,
        public name: string,
        public component: ComponentType<CleanTableColumnComponent<any>>,
        options?: Partial<Pick<CleanTableColumn<TRowElement, TValue>, 'component' | CleanTableColumnKeySubset>>
    ) {
        Object.assign(this, options);
    }

    click: (rowElement: TRowElement) => void;
    sortBy: (rowElement: TRowElement) => string | number = (rowElement: TRowElement) => this.value(rowElement)?.toString();
    filterBy: (rowElement: TRowElement) => string = (rowElement: TRowElement) => this.value(rowElement)?.toString();
    exportAs: (rowElement: TRowElement) => string = (rowElement: TRowElement) => this.value(rowElement)?.toString();
    hasValue: (rowElement: TRowElement) => boolean = (rowElement: TRowElement) => !!this.value(rowElement);
}

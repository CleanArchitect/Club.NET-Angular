import { EventEmitter, inject } from '@angular/core';
import { CleanTableColumnBooleanComponent } from '../../components/columns/boolean/boolean.component';
import { CleanBooleanPipe, CleanBooleanTextIntl, ICleanBooleanPipeConfig } from '../../pipes/boolean.pipe';
import { CleanTableColumn, CleanTableColumnKeySubset } from './column';

export class CleanTableColumnBoolean<TRowElement> extends CleanTableColumn<TRowElement, boolean> {
    private booleanPipe = inject(CleanBooleanPipe);
    private booleanTextIntl = inject(CleanBooleanTextIntl);

    icons: ICleanBooleanPipeConfig = {
        trueValue: 'check',
        falseValue: 'close',
        nullValue: 'remove'
    };

    valueChanged = new EventEmitter<{ rowElement: TRowElement, value: boolean }>();

    constructor(
        value: (rowElement: TRowElement) => boolean,
        name: string,
        public type: 'icon' | 'checkbox' | 'slide-toggle' | 'text',
        options?: Partial<Pick<CleanTableColumnBoolean<TRowElement>, 'icons' | 'valueChanged' | 'hasValue' | CleanTableColumnKeySubset>>
    ) {
        super(value, name, CleanTableColumnBooleanComponent, options);

        Object.assign(this, options);
    }

    toText(rowElement: TRowElement): string {
        return this.booleanPipe.transform(this.value(rowElement), this.booleanTextIntl);
    }

    toNumber(rowElement: TRowElement): number {
        return this.value(rowElement) ? 1 : 0;
    }

    toIcon(rowElement: TRowElement): string {
        return this.booleanPipe.transform(this.value(rowElement), this.icons);
    }

    override sortBy = (rowElement: TRowElement): string | number => {
        switch (this.type) {
            case 'icon': return this.toIcon(rowElement);
            case 'text': return this.toText(rowElement);
            case 'slide-toggle':
            case 'checkbox': return this.toNumber(rowElement);
        }
    };

    override hasValue = (rowElement: TRowElement): boolean => this.value(rowElement) != null;
    override exportAs = (rowElement: TRowElement): string => this.toText(rowElement);
}

import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { inject, LOCALE_ID } from '@angular/core';
import { CleanTableColumnNumberComponent } from '../..';
import { CleanNumberFormatPipe } from '../../pipes/number.pipe';
import { CleanTableColumn, CleanTableColumnKeySubset } from './column';

export class CleanTableColumnNumber<TRowElement> extends CleanTableColumn<TRowElement, number> {
    private decimalPipe = inject(DecimalPipe);
    private currencyPipe = inject(CurrencyPipe);
    private numberFormatPipe = inject(CleanNumberFormatPipe);
    private locale = inject(LOCALE_ID);

    decimalOptions: {
        digitsInfo?: string,
        locale?: string
    };

    currencyOptions: {
        currencyCode?: string,
        display?: 'code' | 'symbol' | 'symbol-narrow' | string,
        digitsInfo?: string,
        locale?: string
    }

    formatOptions: {
        options: Intl.NumberFormatOptions,
        locale?: string
    }

    constructor(
        value: (rowElement: TRowElement) => number,
        name: string,
        public style: 'number' | 'decimal' | 'currency' | 'progress' | 'format' = 'number',
        options?: Partial<Pick<CleanTableColumnNumber<TRowElement>, 'formatOptions' | 'currencyOptions' | 'decimalOptions' | CleanTableColumnKeySubset>>
    ) {
        super(value, name, CleanTableColumnNumberComponent, options);

        Object.assign(this, options);
    }

    format(rowElement: TRowElement): string {
        return this.toText(rowElement) ?? this.emptyPlaceholder;
    }

    private toText(rowElement: TRowElement): string {
        switch (this.style) {
            case 'decimal':
                return this.decimalPipe.transform(this.value(rowElement), this.decimalOptions?.digitsInfo, this.decimalOptions?.locale ?? this.locale);
            case 'currency':
                return this.currencyPipe.transform(this.value(rowElement), this.currencyOptions?.currencyCode, this.currencyOptions?.display, this.currencyOptions?.digitsInfo, this.currencyOptions?.locale ?? this.locale);
            case 'format':
                return this.numberFormatPipe.transform(this.value(rowElement), this.formatOptions?.locale ?? this.locale);
            case 'number':
            default: return this.value(rowElement)?.toString();
        }
    }
}
import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { inject, LOCALE_ID } from '@angular/core';
import { CleanTableColumnNumberComponent } from '../..';
import { CleanNumberFormatPipe } from '../../pipes/number.pipe';
import { CleanTableColumn, CleanTableColumnKeySubset } from './column';

export class CleanTableColumnNumber<TRowElement> extends CleanTableColumn<TRowElement, number> {
    private decimalPipe = inject(DecimalPipe);
    private currencyPipe = inject(CurrencyPipe);
    private percentPipe = inject(PercentPipe);
    private numberFormatPipe = inject(CleanNumberFormatPipe);

    locale = inject(LOCALE_ID);
    digitsInfo?: string;
    formatOptions: Intl.NumberFormatOptions;
    currencyOptions: {
        currencyCode?: string,
        display?: 'code' | 'symbol' | 'symbol-narrow' | string
    }

    constructor(
        value: (rowElement: TRowElement) => number,
        name: string,
        public style: 'raw' | 'decimal' | 'currency' | 'percentage' | 'rating' | 'progress' | 'format' = 'raw',
        options?: Partial<Pick<CleanTableColumnNumber<TRowElement>, 'locale' | 'digitsInfo' | 'formatOptions' | 'currencyOptions' | CleanTableColumnKeySubset>>
    ) {
        super(value, name, CleanTableColumnNumberComponent, options);

        Object.assign(this, options);
    }

    format(rowElement: TRowElement): string {
        return this.toText(rowElement) ?? this.emptyPlaceholder;
    }

    toStars(rowElement: TRowElement, totalStars = 5): { icon: string, outlined: boolean }[] {
        const rating = Math.min(this.value(rowElement), totalStars);

        return Array.from({ length: totalStars }, (_, starNumber) => ({
            icon: starNumber < Math.floor(rating) ? 'star' : starNumber < rating ? 'star_half' : 'star',
            outlined: starNumber >= rating
        }));
    }

    private toText(rowElement: TRowElement): string {
        switch (this.style) {
            case 'decimal':
                return this.decimalPipe.transform(this.value(rowElement), this.digitsInfo, this.locale);
            case 'percentage':
                return this.percentPipe.transform(this.value(rowElement), this.digitsInfo, this.locale);
            case 'currency':
                return this.currencyPipe.transform(this.value(rowElement), this.currencyOptions?.currencyCode, this.currencyOptions?.display, this.digitsInfo, this.locale);
            case 'format':
                return this.numberFormatPipe.transform(this.value(rowElement), this.locale);
            default: return this.value(rowElement)?.toString();
        }
    }
}
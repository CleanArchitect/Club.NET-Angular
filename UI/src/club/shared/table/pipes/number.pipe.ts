import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cleanNumberFormat' })
export class CleanNumberFormatPipe implements PipeTransform {
    private locale = inject(LOCALE_ID);

    transform(value: number, locale?: string, options?: Intl.NumberFormatOptions): string {
        return !value
            ? ''
            : new Intl
                .NumberFormat(locale ?? this.locale, options)
                .format(value);
    }
}
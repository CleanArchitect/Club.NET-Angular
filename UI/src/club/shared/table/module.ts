import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CleanTableHeaderComponents } from './components/header/header';
import { CleanArrayPipe, CleanBooleanPipe, CleanNumberFormatPipe, CleanSafeHtmlPipe } from './pipes';
import { CleanTableComponent } from './table';

@NgModule({
    imports: [
        CleanTableComponent,
        CleanTableHeaderComponents
    ],
    exports: [
        CleanTableComponent, 
        CleanTableHeaderComponents
    ],
    providers: [
        DatePipe,
        CurrencyPipe,
        DecimalPipe,
        PercentPipe,
        CleanArrayPipe,
        CleanBooleanPipe,
        CleanSafeHtmlPipe,
        CleanNumberFormatPipe 
    ]
})
export class CleanTableModule { }
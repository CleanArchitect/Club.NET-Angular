import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CleanTableHeaderComponents } from './components/header/header';
import { CleanArrayPipe } from './pipes/array.pipe';
import { CleanBooleanPipe } from './pipes/boolean.pipe';
import { CleanSafeHtmlPipe } from './pipes/html.pipe';
import { CleanNumberFormatPipe } from './pipes/number.pipe';
import { CleanTableComponent } from './table';

@NgModule({
    imports: [
        CleanTableComponent,
        CleanTableHeaderComponents
        // CommonModule, 
        // MatTableModule, 
        // MatSortModule, 
        // MatPaginatorModule, 
        // MatFormFieldModule, 
        // MatIconModule, 
        // MatButtonModule,
        // MatCheckboxModule,
        // MatSlideToggleModule,
    ],
    exports: [
        CleanTableComponent, 
        CleanTableHeaderComponents,
        // CleanResizeDirective
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
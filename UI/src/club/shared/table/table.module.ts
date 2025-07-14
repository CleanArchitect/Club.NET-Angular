import { NgModule } from '@angular/core';
import { CleanTableHeaderComponents } from './components/header/header';
import { CleanArrayPipe } from './pipes/array.pipe';
import { CleanBooleanPipe } from './pipes/boolean.pipe';
import { CleanSafeHtmlPipe } from './pipes/html.pipe';
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
        CleanArrayPipe,
        CleanBooleanPipe,
        CleanSafeHtmlPipe
    ]
})
export class CleanTableModule { }
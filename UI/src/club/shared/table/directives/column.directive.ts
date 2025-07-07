import { Directive, inject, Input, OnInit, ViewContainerRef } from '@angular/core';
import { CleanTableColumn } from '../models/columns/column';

@Directive({ selector: '[cleanTableColumn]' })
export class CleanTableColumnComponentDirective<TRowElement> implements OnInit {
    private viewContainerRef = inject(ViewContainerRef);

    @Input({ alias: 'cleanTableColumn', required: true }) column: CleanTableColumn<TRowElement, any>;

    @Input({ required: true }) rowElement: TRowElement;

    ngOnInit(): void {
        this.viewContainerRef.clear();
        const columnComponentRef = this.viewContainerRef.createComponent(this.column.component);
        columnComponentRef.instance.column = this.column;
        columnComponentRef.instance.rowElement = this.rowElement;
    }
}
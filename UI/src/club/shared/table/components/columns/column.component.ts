import { Directive, Input } from '@angular/core';
import { CleanTableColumn } from '../../models/columns/column';

@Directive()
export abstract class CleanTableColumnComponent<TColumn extends CleanTableColumn<any>> {
    @Input({ required: true }) column!: TColumn;
    @Input({ required: true }) rowElement!: any;
}
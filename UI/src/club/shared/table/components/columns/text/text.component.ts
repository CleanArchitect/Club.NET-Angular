import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CleanTableColumnText } from '../../../models/columns/text.column';
import { CleanSafeHtmlPipe } from '../../../pipes/html.pipe';
import { CleanTableColumnComponent } from '../column.component';

@Component({
    selector: 'clean-table-column-text',
    templateUrl: 'text.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CleanSafeHtmlPipe]
})
export class CleanTableColumnTextComponent extends CleanTableColumnComponent<CleanTableColumnText<any>> { }
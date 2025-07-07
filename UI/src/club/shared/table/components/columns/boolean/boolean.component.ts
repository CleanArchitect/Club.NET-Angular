import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CleanTableColumnBoolean } from '../../../models/columns/boolean';
import { CleanTableColumnComponent } from '../column.component';

@Component({
    selector: 'clean-table-column-boolean',
    templateUrl: 'boolean.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSlideToggleModule,
    ]
})
export class CleanTableColumnBooleanComponent extends CleanTableColumnComponent<CleanTableColumnBoolean<any>> {
    get value(): boolean {
        return this.column.value(this.rowElement);
    }

    change(value: boolean): void {
        this.column.valueChanged.emit({ value: value, rowElement: this.rowElement });
    }
}
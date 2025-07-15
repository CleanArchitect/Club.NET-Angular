import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CleanTableColumnNumber } from '../../..';
import { CleanTableColumnComponent } from '../column.component';

@Component({
    selector: 'clean-table-column-number',
    templateUrl: 'number.component.html',
    styleUrl: 'number.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, MatIconModule, MatProgressBarModule]
})
export class CleanTableColumnNumberComponent extends CleanTableColumnComponent<CleanTableColumnNumber<any>> { }
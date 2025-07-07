import { ChangeDetectionStrategy, Component } from '@angular/core';

// export interface ICleanTableHeaderConfig { }

// @Component({
//     selector: 'clean-table-header',
//     templateUrl: 'header.html',
//     styleUrl: 'header.scss',
//     imports: [CommonModule, MatIconModule]
// })
// export class CleanTableHeaderComponent {
//     @Input() config: ICleanTableHeaderConfig;
// }

@Component({
    selector: 'clean-table-header, clean-table-title, clean-table-subtitle, clean-table-actions',
    template: '<ng-content />',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CleanTableHeaderComponents { }
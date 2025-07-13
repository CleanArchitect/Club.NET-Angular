import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, HostBinding, inject, Input, OnChanges, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CleanResizeDirective, CleanTable, CleanTableAppearance, CleanTableColumn, CleanTableColumnComponentDirective, CleanTableConfigurationComponent, CleanTableEvent, CleanTableHeaderComponents, ICleanTableConfig } from '.';

@Component({
    selector: 'clean-table[data][columns]',
    templateUrl: 'table.html',
    styleUrl: 'table.scss',
    host: { 'class': 'clean-table' },
    // changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, CleanTableHeaderComponents, CleanTableColumnComponentDirective, CleanResizeDirective, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule]
})
export class CleanTableComponent<TRowElement> implements OnInit, OnChanges, AfterViewInit {
    private hostContainerRef = inject(ViewContainerRef);
    private overlay = inject(Overlay);

    @Input() data: TRowElement[];
    @Input() columns: CleanTableColumn<TRowElement>[];
    @Input() config: ICleanTableConfig = {};
    @Input() appearance: CleanTableAppearance = 'fill';

    @Output() readonly modified = new EventEmitter<CleanTableEvent>();
    @Output() readonly page = new EventEmitter<PageEvent>();

    @ViewChild(MatPaginator) private paginator: MatPaginator;
    @ViewChild(MatSort) private sort: MatSort;

    @HostBinding('attr.appearance') get hostAppearance(): string { return this.appearance; }

    readonly table: CleanTable<TRowElement> = new CleanTable();

    ngOnInit(): void {
        this.table.update(this.data, this.columns);
    }

    ngOnChanges(): void {
        if (this.data && this.columns)
            this.table.update(this.data, this.columns);
    }

    ngAfterViewInit(): void {
        this.table
            .addPaginator(this.paginator)
            .addSort(this.sort);
    }

    configuration(configButton: MatIconButton) {
        const positionStrategy = this.overlay.position()
            .flexibleConnectedTo(configButton._elementRef.nativeElement)
            .withPositions([{ originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' }]);

        const overlayRef = this.overlay.create({
            positionStrategy: this.overlay.position()
                .global()
                .top('0')
                .right('0'),
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-dark-backdrop',
        });

        const componentRef = overlayRef.attach(
            new ComponentPortal(CleanTableConfigurationComponent, this.hostContainerRef)
        );

        componentRef.instance.config = this.config;
        componentRef.instance.columns = this.columns;

        overlayRef
            .backdropClick()
            .subscribe(() => overlayRef.dispose());
    }


    fullscreen(): void {
        this.hostContainerRef.element.nativeElement.requestFullscreen();
    }

    export(): void {
        this.table
            .export()
            .toExcel(`table-export.xlsx`);
    }
}
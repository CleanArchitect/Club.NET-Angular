import { MatPaginatorDefaultOptions } from '@angular/material/paginator';

export interface ICleanTableConfig {
    enableSettings?: boolean;
    enableFilter?: boolean;
    enableFullscreen?: boolean;
    enableExport?: boolean;
    enableColumnMove?: boolean;
    actions?: ICleanTableActionsConfig<any>;
    pagination?: Pick<MatPaginatorDefaultOptions, 'hidePageSize' | 'pageSize' | 'pageSizeOptions' | 'showFirstLastButtons'>;
}

export interface ICleanTableAction<TRowElement> {
    icon: string;
    click: (rowElement: TRowElement) => void;
    tooltip: string;
}

export interface ICleanTableActionsConfig<TRowElement> {
    rowClick?: (rowElement: TRowElement) => void;
    rowSelect?: (rowElement: TRowElement) => void;
    delete?: (rowElement: TRowElement) => void;
    selectAll?: (rowElements: TRowElement[]) => void;
    rowActions?: ICleanTableAction<TRowElement>[];
}

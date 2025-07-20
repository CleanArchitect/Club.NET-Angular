import { CleanTableColumn } from '../columns/column';
import { ICleanTableConfig } from '../config/table.config';

export class CleanTableEvent {
    config: ICleanTableConfig;
    columns: CleanTableColumn<any>[];
}

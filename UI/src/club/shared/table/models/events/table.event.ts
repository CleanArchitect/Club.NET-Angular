import { ICleanTableConfig } from '../../config/table.config';
import { CleanTableColumn } from '../columns/column';

export class CleanTableEvent {
    config: ICleanTableConfig;
    columns: CleanTableColumn<any>[];
}

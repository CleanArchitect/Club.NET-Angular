import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export class CleanTableExport {
    constructor(private exportRowElements: { [key: string]: string; }[]) { }

    toExcel(filename?: string): void {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(this.exportRowElements);

        XLSX.utils.book_append_sheet(workbook, worksheet);

        const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }) as Uint8Array;

        saveAs(this.createBlob(buffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'), filename);
    }

    private createBlob(parts: BlobPart, mimeType: string): Blob {
        return new Blob([parts], { type: mimeType });
    }
}

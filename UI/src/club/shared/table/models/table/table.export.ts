import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';

export class CleanTableExport {
    constructor(private exportRowElements: { [key: string]: string; }[]) { }

    toExcel(filename?: string): void {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        worksheet.addRows(this.exportRowElements);

        workbook.xlsx
            .writeBuffer()
            .then(buffer =>
                saveAs(this
                    .createBlob(buffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'), filename)
            );
    }

    private createBlob(parts: BlobPart, mimeType: string): Blob {
        return new Blob([parts], { type: mimeType });
    }
}

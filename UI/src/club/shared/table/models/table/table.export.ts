import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';

export class CleanTableExport {
    private readonly excelMimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    constructor(private exportRowElements: { [key: string]: string; }[]) { }

    toExcel(filename?: string, sheetname?: string): void {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(sheetname ?? 'Sheet1');

        worksheet.columns = Object
            .keys(this.exportRowElements[0] ?? {})
            .map(key => ({ header: key, key }));

        worksheet.addRows(this.exportRowElements);

        workbook.xlsx
            .writeBuffer()
            .then(buffer =>
                saveAs(this.createBlob(buffer, this.excelMimeType), filename));
    }

    private createBlob(parts: BlobPart, mimeType: string): Blob {
        return new Blob([parts], { type: mimeType });
    }
}

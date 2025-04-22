using Clean.Core;
using ClosedXML.Excel;

namespace Domain;

internal sealed class ExportExcelKnwuWedstrijdUseCase(IEntityGateway<KnwuWedstrijd> gateway) : IUseCase<ExportExcelKnwuWedstrijdInput>
{
    public async Task<IOutput> ExecuteAsync(ExportExcelKnwuWedstrijdInput input)
    {
        var wedstrijd = await gateway.FindAsync(input.WedstrijdId);

        using var workbook = new XLWorkbook();

        workbook
            .AddWorksheet()
            .AddHeader(["Nummer", "KNWU-ID", "UCI-ID"])
            .Cell(2, 1)
            .InsertData(wedstrijd.Deelnemers.Select(KnwuWedstrijdDeelnemerExcelModel.Create))
            .Worksheet.Columns()
            .AdjustToContents();

        return new ExportExcelKnwuWedstrijdOutput(workbook.SaveAsBytes(), $"{wedstrijd.Naam}-export_{DateTime.Now:dd-MM-yyyy HH:mm}.xlsx");
    }
}

public static class IXLWorksheetExtensions
{
    public static IXLWorksheet AddHeader(this IXLWorksheet worksheet, IEnumerable<string> columns)
    {
        columns
            .Select((value, index) => new { value, index })
            .ToList()
            .ForEach(item => worksheet.Cell(1, item.index + 1).Value = item.value);

        return worksheet;
    }
}
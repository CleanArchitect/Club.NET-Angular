using ClosedXML.Excel;

namespace Domain;

internal static class ClosedXMLExtensions
{
    public static IXLWorksheet AddHeader(this IXLWorksheet worksheet, IEnumerable<string> columns)
    {
        columns
            .Select((value, index) => new { value, index })
            .ToList()
            .ForEach(item => worksheet.Cell(1, item.index + 1).Value = item.value);

        return worksheet;
    }

    public static byte[] SaveAsBytes(this XLWorkbook workbook)
    {
        using var memoryStream = new MemoryStream();

        workbook.SaveAs(memoryStream);

        return memoryStream.ToArray();
    }
}
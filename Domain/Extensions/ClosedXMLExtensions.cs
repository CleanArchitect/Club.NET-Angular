using ClosedXML.Excel;

namespace Domain;

internal static class ClosedXMLExtensions
{
    public static byte[] SaveAsBytes(this XLWorkbook workbook)
    {
        using var memoryStream = new MemoryStream();

        workbook.SaveAs(memoryStream);

        return memoryStream.ToArray();
    }
}
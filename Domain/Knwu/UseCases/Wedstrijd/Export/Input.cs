using Clean.Net;

namespace Domain;

public sealed class ExportExcelKnwuWedstrijdInput(Guid id) : IFileExportInput
{
    public Guid WedstrijdId => id;
}
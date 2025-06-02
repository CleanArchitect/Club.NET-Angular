using Clean.Net;

namespace Domain;

public sealed class ExportExcelKnwuWedstrijdInput(Guid wedstrijdId, Guid categorieId) : IFileExportInput
{
    public Guid WedstrijdId => wedstrijdId;
    public Guid CategorieId => categorieId;
}
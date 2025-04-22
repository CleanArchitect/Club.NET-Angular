using Clean.Core;

namespace Domain;

public sealed class ExportExcelKnwuWedstrijdInput(Guid id) : IInput
{
    public Guid WedstrijdId => id;
}
using Clean.Core;

namespace Domain;

public sealed class UpdateKnwuWedstrijdDeelnemerStartnummerOutput : IOutput
{
    public KnwuWedstrijdDeelnemerExcelModel Deelnemer { get; init; }

    internal UpdateKnwuWedstrijdDeelnemerStartnummerOutput(KnwuWedstrijdDeelnemer deelnemer)
    {
        Deelnemer = KnwuWedstrijdDeelnemerExcelModel.Create(deelnemer);
    }
}
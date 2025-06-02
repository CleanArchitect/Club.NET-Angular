using Clean.Net;

namespace Domain;

public sealed class UpdateKnwuWedstrijdCategorieDeelnemerStartnummerOutput : IOutput
{
    public KnwuWedstrijdDeelnemerExcelModel Deelnemer { get; init; }

    internal UpdateKnwuWedstrijdCategorieDeelnemerStartnummerOutput(KnwuWedstrijdCategorieDeelnemer deelnemer)
    {
        Deelnemer = KnwuWedstrijdDeelnemerExcelModel.Create(deelnemer);
    }
}
using Clean.Net;

namespace Domain;

public sealed class GetKnwuWedstrijdDeelnemerOutput : IOutput
{
    public KnwuWedstrijdDeelnemerExcelModel Deelnemer { get; init; }

    internal GetKnwuWedstrijdDeelnemerOutput(KnwuWedstrijdCategorieDeelnemer deelnemer)
    {
        Deelnemer = KnwuWedstrijdDeelnemerExcelModel.Create(deelnemer);
    }
}

using Clean.Core;

namespace Domain;

public sealed class GetKnwuWedstrijdDeelnemerOutput : IOutput
{
    public KnwuWedstrijdDeelnemerExcelModel Deelnemer { get; init; }

    internal GetKnwuWedstrijdDeelnemerOutput(KnwuWedstrijdDeelnemer deelnemer)
    {
        Deelnemer = KnwuWedstrijdDeelnemerExcelModel.Create(deelnemer);
    }
}

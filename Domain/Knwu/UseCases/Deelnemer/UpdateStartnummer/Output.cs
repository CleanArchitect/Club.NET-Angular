using Clean.Net;

namespace Domain;

public sealed class UpdateKnwuWedstrijdCategorieDeelnemerStartnummerOutput : IOutput
{
    public KnwuWedstrijdDeelnemerModel Deelnemer { get; init; }

    internal UpdateKnwuWedstrijdCategorieDeelnemerStartnummerOutput(KnwuWedstrijdCategorieDeelnemer deelnemer)
    {
        Deelnemer = KnwuWedstrijdDeelnemerModel.Create(deelnemer);
    }
}
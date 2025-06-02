using Clean.Net;

namespace Domain;

public sealed class CreateKnwuWedstrijdCategorieDeelnemerOutput : ICreatedOutput
{
    public Guid? Id => Deelnemer.Id;

    public KnwuWedstrijdDeelnemerModel Deelnemer { get; init; }

    internal CreateKnwuWedstrijdCategorieDeelnemerOutput(KnwuWedstrijdCategorieDeelnemer deelnemer)
    {
        Deelnemer = KnwuWedstrijdDeelnemerModel.Create(deelnemer);
    }
}
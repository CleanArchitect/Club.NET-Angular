using Clean.Net;

namespace Domain;

public sealed class CreateKnwuWedstrijdDeelnemerOutput : IOutput
{
    public Guid? Id => Deelnemer.Id;

    public KnwuWedstrijdDeelnemerModel Deelnemer { get; init; }

    internal CreateKnwuWedstrijdDeelnemerOutput(KnwuWedstrijdDeelnemer deelnemer)
    {
        Deelnemer = KnwuWedstrijdDeelnemerModel.Create(deelnemer);
    }
}
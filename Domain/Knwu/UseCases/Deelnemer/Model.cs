namespace Domain;

public sealed class KnwuWedstrijdDeelnemerModel
{
    public Guid Id { get; init; }
    public short Startnummer { get; init; }
    public string KnwuId { get; init; }
    public string UciId { get; init; }

    internal KnwuWedstrijdDeelnemerModel(KnwuWedstrijdDeelnemer deelnemer)
    {
        Id = deelnemer.Id;
        Startnummer = deelnemer.Startnummer;
        KnwuId = deelnemer.KnwuId;
        UciId = deelnemer.UciId;
    }

    internal static KnwuWedstrijdDeelnemerModel Create(KnwuWedstrijdDeelnemer deelnemer) =>
        deelnemer == null ? null : new(deelnemer);
}

namespace Domain;

public sealed class KnwuWedstrijdDeelnemerModel
{
    public Guid Id { get; init; }
    public string KnwuId { get; init; }
    public string UciId { get; init; }
    public short Startnummer { get; init; }

    internal KnwuWedstrijdDeelnemerModel(KnwuWedstrijdCategorieDeelnemer deelnemer)
    {
        Id = deelnemer.Id;
        Startnummer = deelnemer.Startnummer;
        KnwuId = deelnemer.KnwuId;
        UciId = deelnemer.UciId;
    }

    internal static KnwuWedstrijdDeelnemerModel Create(KnwuWedstrijdCategorieDeelnemer deelnemer) =>
        deelnemer == null ? null : new(deelnemer);
}

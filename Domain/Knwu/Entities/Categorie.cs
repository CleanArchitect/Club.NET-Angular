using Clean.Net;

namespace Domain;

internal class KnwuWedstrijdCategorie : Entity
{
    public string Naam { get; private set; }

    public decimal? Bedrag { get; private set; }

    public IReadOnlyCollection<short> Startnummers => startnummers.AsReadOnly();

    public virtual IReadOnlyCollection<KnwuWedstrijdCategorieDeelnemer> Deelnemers => deelnemers.AsReadOnly();

    private readonly List<KnwuWedstrijdCategorieDeelnemer> deelnemers = [];

    private readonly List<short> startnummers = [];

    protected KnwuWedstrijdCategorie() { }

    public KnwuWedstrijdCategorie(CreateKnwuWedstrijdCategorieInput input)
    {
        Naam = input.Naam;
        Bedrag = input.Bedrag;
        startnummers = [.. input.StartnummerBegin.ToRange(input.StartnummerEind)];
    }

    public KnwuWedstrijdCategorieDeelnemer CreateDeelnemer(CreateKnwuWedstrijdCategorieDeelnemerInput input)
    {
        var deelnemer = new KnwuWedstrijdCategorieDeelnemer(input, this);

        deelnemers.Add(deelnemer);

        return deelnemer;
    }

    public short TakeStartnummer()
    {
        var nextStartnummer = startnummers.Min();

        startnummers.Remove(nextStartnummer);

        return nextStartnummer;
    }
}

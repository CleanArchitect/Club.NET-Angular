using Clean.Net;

namespace Domain;

internal class KnwuWedstrijdCategorie : Entity
{
    public string Naam { get; private set; }

    public IReadOnlyCollection<short> Startnummers => startnummers.AsReadOnly();

    private readonly List<short> startnummers = [];

    protected KnwuWedstrijdCategorie() { }

    public KnwuWedstrijdCategorie(CreateKnwuWedstrijdCategorieInput input)
    {
        Naam = input.Naam;
        startnummers = [.. input.StartnummerBegin.ToRange(input.StartnummerEind)];
    }

    public short TakeStartnummer()
    {
        var nextStartnummer = startnummers.Min();

        startnummers.Remove(nextStartnummer);

        return nextStartnummer;
    }
}

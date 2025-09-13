namespace Domain;

public sealed class KnwuWedstrijdModel
{
    public Guid Id { get; }

    public string KnwuWedstrijdnummer { get; }

    public string Naam { get; }

    public DateOnly Datum { get; }

    public IReadOnlyCollection<KnwuWedstrijdCategorieModel> Categorieen { get; init; }

    internal KnwuWedstrijdModel(KnwuWedstrijd wedstrijd)
    {
        Id = wedstrijd.Id;
        KnwuWedstrijdnummer = wedstrijd.KnwuWedstrijdnummer;
        Naam = wedstrijd.Naam;
        Datum = wedstrijd.Datum;
        Categorieen = [.. wedstrijd.Categorieen.Select(KnwuWedstrijdCategorieModel.Create)];
    }

    internal static KnwuWedstrijdModel Create(KnwuWedstrijd wedstrijd) =>
        wedstrijd == null ? null : new(wedstrijd);
}

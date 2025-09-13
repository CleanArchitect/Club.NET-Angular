namespace Domain;

public sealed class KnwuWedstrijdCategorieModel
{
    public Guid Id { get; }

    public string Naam { get; }

    public decimal? Bedrag { get; }

    public IReadOnlyCollection<KnwuWedstrijdDeelnemerModel> Deelnemers { get; init; }

    internal KnwuWedstrijdCategorieModel(KnwuWedstrijdCategorie categorie)
    {
        Id = categorie.Id;
        Naam = categorie.Naam;
        Bedrag = categorie.Bedrag;
        Deelnemers = [.. categorie.Deelnemers.Select(KnwuWedstrijdDeelnemerModel.Create)];
    }

    internal static KnwuWedstrijdCategorieModel Create(KnwuWedstrijdCategorie categorie) =>
        categorie == null ? null : new(categorie);
}
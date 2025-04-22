namespace Domain;

public sealed class KnwuWedstrijdCategorieModel
{
    public Guid Id { get; init; }

    public string Naam { get; init; }

    internal KnwuWedstrijdCategorieModel(KnwuWedstrijdCategorie categorie)
    {
        Id = categorie.Id;
        Naam = categorie.Naam;
    }

    internal static KnwuWedstrijdCategorieModel Create(KnwuWedstrijdCategorie categorie) =>
        categorie == null ? null : new(categorie);
}
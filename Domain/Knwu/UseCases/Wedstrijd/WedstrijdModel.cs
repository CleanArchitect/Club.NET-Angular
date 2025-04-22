namespace Domain;

public sealed class KnwuWedstrijdModel
{
    public Guid Id { get; init; }

    public string Naam { get; init; }

    public IReadOnlyCollection<KnwuWedstrijdDeelnemerExcelModel> Deelnemers { get; init; }

    public IReadOnlyCollection<KnwuWedstrijdCategorieModel> Categorieen { get; init; }

    internal KnwuWedstrijdModel(KnwuWedstrijd wedstrijd)
    {
        Id = wedstrijd.Id;
        Naam = wedstrijd.Naam;
        Deelnemers = [.. wedstrijd.Deelnemers.Select(KnwuWedstrijdDeelnemerExcelModel.Create)];
        Categorieen = [.. wedstrijd.Categorieen.Select(KnwuWedstrijdCategorieModel.Create)];
    }

    internal static KnwuWedstrijdModel Create(KnwuWedstrijd wedstrijd) =>
        wedstrijd == null ? null : new(wedstrijd);
}

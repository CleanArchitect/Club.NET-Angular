

namespace Domain;

internal class KnwuWedstrijd : Evenement
{
    public string KnwuWedstrijdnummer { get; private set; }

    public string Naam { get; private set; }

    public virtual IReadOnlyCollection<KnwuWedstrijdCategorie> Categorieen => categorieen.AsReadOnly();

    private readonly List<KnwuWedstrijdCategorie> categorieen = [];

    protected KnwuWedstrijd() { }

    public KnwuWedstrijd(CreateKnwuWedstrijdInput input)
    {
        KnwuWedstrijdnummer = input.KnwuWedstrijdnummer;
        Naam = input.Naam;
        Datum = input.Datum;
        categorieen = [.. input.Categorieen.Select(categorie => new KnwuWedstrijdCategorie(categorie))];
    }

    public KnwuWedstrijdCategorieDeelnemer CreateDeelnemer(CreateKnwuWedstrijdCategorieDeelnemerInput input) =>
        Categorieen
            .Single(categorie => categorie.Id == input.CategorieId)
            .CreateDeelnemer(input);

    public KnwuWedstrijdCategorieDeelnemer UpdateDeelnemerStartnummer(UpdateKnwuWedstrijdCategorieDeelnemerStartnummerInput input) =>
        Categorieen
            .Single(categorie => categorie.Id == input.CategorieId).Deelnemers
            .Single(deelnemer => deelnemer.Id == input.DeelnemerId)
            .UpdateStartnummer();
}

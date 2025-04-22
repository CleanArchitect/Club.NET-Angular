namespace Domain;

internal class KnwuWedstrijd : Evenement
{
    public string KnwuWedstrijdnummer { get; private set; }

    public string Naam { get; private set; }

    public decimal Bedrag { get; private set; }

    public virtual IReadOnlyCollection<KnwuWedstrijdCategorie> Categorieen => categorieen.AsReadOnly();

    public virtual IReadOnlyCollection<KnwuWedstrijdDeelnemer> Deelnemers => deelnemers.AsReadOnly();

    private readonly List<KnwuWedstrijdDeelnemer> deelnemers = [];

    private readonly List<KnwuWedstrijdCategorie> categorieen = [];

    protected KnwuWedstrijd() { }

    public KnwuWedstrijd(CreateKnwuWedstrijdInput input)
    {
        KnwuWedstrijdnummer = input.KnwuWedstrijdnummer;
        Naam = input.Naam;
        Bedrag = input.Bedrag;
        categorieen = [.. input.Categorieen.Select(categorie => new KnwuWedstrijdCategorie(categorie))];
    }

    public KnwuWedstrijdDeelnemer CreateDeelnemer(CreateKnwuWedstrijdDeelnemerInput input)
    {
        var categorie = Categorieen
            .Single(categorie => categorie.Id == input.CategorieId);

        var deelnemer = KnwuWedstrijdDeelnemer.Create(input, categorie);

        deelnemers.Add(deelnemer);

        return deelnemer;
    }

    public KnwuWedstrijdDeelnemer UpdateDeelnemerStartnummer(UpdateKnwuWedstrijdDeelnemerStartnummerInput input) =>
        Deelnemers
            .Single(deelnemer => deelnemer.Id == input.DeelnemerId)
            .UpdateStartnummer(Categorieen.Single(categorie => categorie.Id == input.CategorieId));
}

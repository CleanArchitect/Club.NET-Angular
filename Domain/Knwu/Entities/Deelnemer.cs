using Clean.Net;

namespace Domain;

internal class KnwuWedstrijdCategorieDeelnemer : Entity
{
    public string KnwuId { get; private set; }

    public string UciId { get; private set; }

    public short Startnummer { get; private set; }

    public virtual KnwuWedstrijdCategorie Categorie { get; private set; }

    protected KnwuWedstrijdCategorieDeelnemer() { }

    public KnwuWedstrijdCategorieDeelnemer(CreateKnwuWedstrijdCategorieDeelnemerInput input, KnwuWedstrijdCategorie categorie)
    {
        KnwuId = input.KnwuId;
        UciId = input.UciId;
        Categorie = categorie;
        Startnummer = categorie.TakeStartnummer();
    }

    public KnwuWedstrijdCategorieDeelnemer UpdateStartnummer()
    {
        Startnummer = Categorie.TakeStartnummer();
        return this;
    }
}

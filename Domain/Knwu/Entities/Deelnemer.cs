using Clean.Core;

namespace Domain;

internal class KnwuWedstrijdDeelnemer : Entity
{
    public string KnwuId { get; private set; }

    public string UciId { get; private set; }

    public short Startnummer { get; private set; }

    protected KnwuWedstrijdDeelnemer() { }

    private KnwuWedstrijdDeelnemer(CreateKnwuWedstrijdDeelnemerInput input, short startnummer)
    {
        KnwuId = input.KnwuId;
        UciId = input.UciId;
        Startnummer = startnummer;
    }

    public static KnwuWedstrijdDeelnemer Create(CreateKnwuWedstrijdDeelnemerInput input, KnwuWedstrijdCategorie categorie) =>
        new(input, categorie.TakeStartnummer());

    public KnwuWedstrijdDeelnemer UpdateStartnummer(KnwuWedstrijdCategorie categorie)
    {
        Startnummer = categorie.TakeStartnummer();
        return this;
    }
}

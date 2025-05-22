using Clean.Net;

namespace Domain;

public sealed class GetKnwuWedstrijdOutput : IOutput
{
    public KnwuWedstrijdModel Wedstrijd { get; private set; }

    internal GetKnwuWedstrijdOutput(KnwuWedstrijd wedstrijd)
    {
        Wedstrijd = KnwuWedstrijdModel.Create(wedstrijd);
    }
}
using Clean.Net;

namespace Domain;

public sealed class CreateKnwuWedstrijdOutput : ICreatedOutput
{
    public Guid? Id => Wedstrijd.Id;

    public KnwuWedstrijdModel Wedstrijd { get; init; }

    internal CreateKnwuWedstrijdOutput(KnwuWedstrijd wedstrijd)
    {
        Wedstrijd = KnwuWedstrijdModel.Create(wedstrijd);
    }
}
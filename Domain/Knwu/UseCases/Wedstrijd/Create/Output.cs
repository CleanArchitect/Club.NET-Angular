using Clean.Net;

namespace Domain;

public sealed class CreateKnwuWedstrijdOutput : ICreatedOutput
{
    public Guid? Id { get; }

    internal CreateKnwuWedstrijdOutput(KnwuWedstrijd wedstrijd)
    {
        Id = wedstrijd.Id;
    }
}

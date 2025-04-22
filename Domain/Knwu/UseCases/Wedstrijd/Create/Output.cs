using Clean.Core;

namespace Domain;

public sealed class CreateKnwuWedstrijdOutput : IOutput
{
    public Guid? Id { get; }

    internal CreateKnwuWedstrijdOutput(KnwuWedstrijd wedstrijd)
    {
        Id = wedstrijd.Id;
    }
}

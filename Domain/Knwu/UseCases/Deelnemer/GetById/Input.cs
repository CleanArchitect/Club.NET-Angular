using Clean.Core;

namespace Domain;

public sealed class GetKnwuWedstrijdDeelnemerInput(Guid id) : IInput
{
    public Guid Id => id;
}
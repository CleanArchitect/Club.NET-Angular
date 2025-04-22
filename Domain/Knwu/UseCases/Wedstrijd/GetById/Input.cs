using Clean.Core;

namespace Domain;

public sealed class GetKnwuWedstrijdInput(Guid wedstrijdId) : IInput
{
    public Guid WedstrijdId { get; private set; } = wedstrijdId;
}
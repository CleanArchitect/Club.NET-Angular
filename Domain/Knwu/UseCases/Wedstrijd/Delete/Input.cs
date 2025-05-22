using Clean.Net;

namespace Domain;

public sealed class DeleteKnwuWedstrijdInput(Guid wedstrijdId) : IInput
{
    public Guid WedstrijdId => wedstrijdId;
}
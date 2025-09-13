using Clean.Net;

namespace Domain;

public sealed class DeleteKnwuWedstrijdDeelnemerInput(Guid deelnemerId) : IInput
{
    public Guid DeelnemerId => deelnemerId;
}

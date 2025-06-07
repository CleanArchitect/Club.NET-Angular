using Clean.Net;

namespace Domain;

public sealed class UpdateKnwuWedstrijdCategorieDeelnemerStartnummerInput : IInput
{
    public Guid DeelnemerId { get; }

    public UpdateKnwuWedstrijdCategorieDeelnemerStartnummerInput(Guid deelnemerId)
    {
        DeelnemerId = deelnemerId;
    }
}
using Clean.Net;

namespace Domain;

public sealed class UpdateKnwuWedstrijdDeelnemerStartnummerInput : IInput
{
    public Guid CategorieId { get; set; }

    public Guid DeelnemerId { get; private set; }

    public Guid WedstrijdId { get; private set; }

    public UpdateKnwuWedstrijdDeelnemerStartnummerInput SetId(Guid deelnemerId, Guid wedstrijdId)
    {
        DeelnemerId = deelnemerId;
        WedstrijdId = wedstrijdId;
        return this;
    }
}
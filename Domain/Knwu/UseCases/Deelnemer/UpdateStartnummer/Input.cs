using Clean.Net;

namespace Domain;

public sealed class UpdateKnwuWedstrijdCategorieDeelnemerStartnummerInput : IInput
{
    public Guid CategorieId { get; set; }

    public Guid DeelnemerId { get; private set; }

    public Guid WedstrijdId { get; private set; }

    public UpdateKnwuWedstrijdCategorieDeelnemerStartnummerInput SetId(Guid deelnemerId, Guid wedstrijdId)
    {
        DeelnemerId = deelnemerId;
        WedstrijdId = wedstrijdId;
        return this;
    }
}
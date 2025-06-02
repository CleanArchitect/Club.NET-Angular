using Clean.Net;

namespace Domain;

public sealed class CreateKnwuWedstrijdCategorieDeelnemerInput : ICreateInput
{
    public Guid WedstrijdId { get; set; }

    public Guid CategorieId { get; set; }

    public string KnwuId { get; set; }

    public string UciId { get; set; }
}
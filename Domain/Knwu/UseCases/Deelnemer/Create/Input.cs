using Clean.Core;

namespace Domain;

public sealed class CreateKnwuWedstrijdDeelnemerInput : IInput
{
    public Guid WedstrijdId { get; set; }

    public Guid CategorieId { get; set; }

    public string KnwuId { get; set; }

    public string UciId { get; set; }
}
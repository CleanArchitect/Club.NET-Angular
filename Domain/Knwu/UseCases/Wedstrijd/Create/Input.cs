using Clean.Net;

namespace Domain;

public sealed class CreateKnwuWedstrijdInput : ICreateInput
{
    public string KnwuWedstrijdnummer { get; set; }

    public string Naam { get; set; }

    public decimal Bedrag { get; set; }

    public IEnumerable<CreateKnwuWedstrijdCategorieInput> Categorieen { get; set; }
}
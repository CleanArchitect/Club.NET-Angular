using Clean.Core;

namespace Domain;

public sealed class CreateKnwuWedstrijdInput : IInput
{
    public string KnwuWedstrijdnummer { get; set; }

    public string Naam { get; set; }

    public decimal Bedrag { get; set; }

    public IEnumerable<CreateKnwuWedstrijdCategorieInput> Categorieen { get; set; }
}
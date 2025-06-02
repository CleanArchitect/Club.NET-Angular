namespace Domain;

public sealed class CreateKnwuWedstrijdCategorieInput
{
    public string Naam { get; set; }

    public decimal? Bedrag { get; set; }

    public short StartnummerBegin { get; set; }

    public short StartnummerEind { get; set; }
}
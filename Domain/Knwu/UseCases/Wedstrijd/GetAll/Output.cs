using Clean.Core;

namespace Domain;

public sealed class GetAllKnwuWedstrijdenOuput : IOutput
{
    public IEnumerable<KnwuWedstrijdModel> Wedstrijden { get; init; }

    internal GetAllKnwuWedstrijdenOuput(IEnumerable<KnwuWedstrijd> wedstrijden)
    {
        Wedstrijden = [.. wedstrijden.Select(KnwuWedstrijdModel.Create)];
    }
}
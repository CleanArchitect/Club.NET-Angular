using Clean.Core;

namespace Domain;

internal sealed class GetAllKnwuWedstrijdenUseCase(IEntityGateway<KnwuWedstrijd> gateway) : IUseCase<GetAllKnwuWedstrijdenInput>
{
    public async Task<IOutput> ExecuteAsync(GetAllKnwuWedstrijdenInput input) =>
        new GetAllKnwuWedstrijdenOuput(await gateway.GetAllAsync(wedstrijd => wedstrijd.Naam.Contains("2")));
}
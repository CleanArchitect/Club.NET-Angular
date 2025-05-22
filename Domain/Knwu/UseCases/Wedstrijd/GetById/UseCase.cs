using Clean.Net;

namespace Domain;

internal sealed class GetKnwuWedstrijdUseCase(IEntityGateway<KnwuWedstrijd> gateway)
    : IUseCase<GetKnwuWedstrijdInput>
{
    public async Task<IOutput> ExecuteAsync(GetKnwuWedstrijdInput input) =>
        new GetKnwuWedstrijdOutput(await gateway.FindAsync(input.WedstrijdId));
}
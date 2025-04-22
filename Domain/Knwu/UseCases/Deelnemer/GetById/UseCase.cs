using Clean.Core;

namespace Domain;

internal sealed class GetKnwuWedstrijdDeelnemerUseCase(IEntityGateway<KnwuWedstrijdDeelnemer> gateway) : IUseCase<GetKnwuWedstrijdDeelnemerInput>
{
    public async Task<IOutput> ExecuteAsync(GetKnwuWedstrijdDeelnemerInput input) =>
        new GetKnwuWedstrijdDeelnemerOutput(await gateway.FindAsync(input.Id));
}
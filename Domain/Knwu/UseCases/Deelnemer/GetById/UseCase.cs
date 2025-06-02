using Clean.Net;

namespace Domain;

internal sealed class GetKnwuWedstrijdDeelnemerUseCase(IEntityGateway<KnwuWedstrijdCategorieDeelnemer> gateway) : IUseCase<GetKnwuWedstrijdDeelnemerInput>
{
    public async Task<IOutput> ExecuteAsync(GetKnwuWedstrijdDeelnemerInput input) =>
        new GetKnwuWedstrijdDeelnemerOutput(await gateway.FindAsync(input.Id));
}
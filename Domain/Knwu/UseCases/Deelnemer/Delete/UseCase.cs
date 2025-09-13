using Clean.Net;

namespace Domain;

internal sealed class DeleteKnwuWedstrijdDeelnemerUseCase(IEntityGateway<KnwuWedstrijdCategorieDeelnemer> gateway)
    : IUseCase<DeleteKnwuWedstrijdDeelnemerInput>
{
    public async Task<IOutput> ExecuteAsync(DeleteKnwuWedstrijdDeelnemerInput input)
    {
        await gateway
            .Delete(input.DeelnemerId)
            .SaveChangesAsync();

        return Output.Empty;
    }
}
using Clean.Net;

namespace Domain;

internal sealed class DeleteKnwuWedstrijdUseCase(IEntityGateway<KnwuWedstrijd> gateway)
    : IUseCase<DeleteKnwuWedstrijdInput>
{
    public async Task<IOutput> ExecuteAsync(DeleteKnwuWedstrijdInput input)
    {
        await gateway
            .Delete(input.WedstrijdId)
            .SaveChangesAsync();

        return Output.Empty;
    }
}
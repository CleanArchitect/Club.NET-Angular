using Clean.Net;

namespace Domain;

internal sealed class CreateKnwuWedstrijdDeelnemerUsecase(IEntityGateway<KnwuWedstrijd> gateway)
    : IUseCase<CreateKnwuWedstrijdDeelnemerInput>
{
    public async Task<IOutput> ExecuteAsync(CreateKnwuWedstrijdDeelnemerInput input)
    {
        var wedstrijd = await gateway.FindAsync(input.WedstrijdId);

        var deelnemer = wedstrijd.CreateDeelnemer(input);

        await gateway.SaveChangesAsync();

        return new CreateKnwuWedstrijdDeelnemerOutput(deelnemer);
    }
}
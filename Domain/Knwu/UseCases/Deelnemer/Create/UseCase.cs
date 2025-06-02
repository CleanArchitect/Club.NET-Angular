using Clean.Net;

namespace Domain;

internal sealed class CreateKnwuWedstrijdDeelnemerUsecase(IEntityGateway<KnwuWedstrijd> gateway)
    : IUseCase<CreateKnwuWedstrijdCategorieDeelnemerInput>
{
    public async Task<IOutput> ExecuteAsync(CreateKnwuWedstrijdCategorieDeelnemerInput input)
    {
        var wedstrijd = await gateway.FindAsync(input.WedstrijdId);

        var deelnemer = wedstrijd.CreateDeelnemer(input);

        await gateway.SaveChangesAsync();

        return new CreateKnwuWedstrijdCategorieDeelnemerOutput(deelnemer);
    }
}
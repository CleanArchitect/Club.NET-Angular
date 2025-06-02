using Clean.Net;

namespace Domain;

internal sealed class UpdateKnwuWedstrijdDeelnemerStartnummerUseCase(IEntityGateway<KnwuWedstrijd> wedstrijdGateway)
    : IUseCase<UpdateKnwuWedstrijdCategorieDeelnemerStartnummerInput>
{
    public async Task<IOutput> ExecuteAsync(UpdateKnwuWedstrijdCategorieDeelnemerStartnummerInput input)
    {
        var wedstrijd = await wedstrijdGateway.FindAsync(input.WedstrijdId);

        var deelnemer = wedstrijd.UpdateDeelnemerStartnummer(input);

        await wedstrijdGateway.SaveChangesAsync();

        return new UpdateKnwuWedstrijdCategorieDeelnemerStartnummerOutput(deelnemer);
    }
}
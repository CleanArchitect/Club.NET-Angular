using Clean.Core;

namespace Domain;

internal sealed class UpdateKnwuWedstrijdDeelnemerStartnummerUseCase(IEntityGateway<KnwuWedstrijd> wedstrijdGateway)
    : IUseCase<UpdateKnwuWedstrijdDeelnemerStartnummerInput>
{
    public async Task<IOutput> ExecuteAsync(UpdateKnwuWedstrijdDeelnemerStartnummerInput input)
    {
        var wedstrijd = await wedstrijdGateway.FindAsync(input.WedstrijdId);

        var deelnemer = wedstrijd.UpdateDeelnemerStartnummer(input);

        await wedstrijdGateway.SaveChangesAsync();

        return new UpdateKnwuWedstrijdDeelnemerStartnummerOutput(deelnemer);
    }
}
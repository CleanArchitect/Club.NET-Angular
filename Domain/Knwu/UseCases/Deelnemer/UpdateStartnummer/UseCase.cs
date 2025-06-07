using Clean.Net;

namespace Domain;

internal sealed class UpdateKnwuWedstrijdDeelnemerStartnummerUseCase(IEntityGateway<KnwuWedstrijdCategorieDeelnemer> deelnemerGateway)
    : IUseCase<UpdateKnwuWedstrijdCategorieDeelnemerStartnummerInput>
{
    public async Task<IOutput> ExecuteAsync(UpdateKnwuWedstrijdCategorieDeelnemerStartnummerInput input)
    {
        var deelnemer = (await deelnemerGateway
            .FindAsync(input.DeelnemerId))
            .UpdateStartnummer();

        await deelnemerGateway.SaveChangesAsync();

        return new UpdateKnwuWedstrijdCategorieDeelnemerStartnummerOutput(deelnemer);
    }
}
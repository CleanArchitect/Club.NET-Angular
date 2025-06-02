using Clean.Net;

namespace Domain;

internal sealed class CreateKnwuWedstrijdUsecase(IEntityGateway<KnwuWedstrijd> gateway)
    : IUseCase<CreateKnwuWedstrijdInput>
{
    public async Task<IOutput> ExecuteAsync(CreateKnwuWedstrijdInput input)
    {
        var wedstrijd = new KnwuWedstrijd(input);

        await gateway
            .Add(wedstrijd)
            .SaveChangesAsync();

        return Output.Created(wedstrijd.Id);
    }
}
using Clean.Net;
using FluentValidation;

namespace Domain;

internal sealed class CreateKnwuWedstrijdDeelnemerInputValidator : AbstractValidator<CreateKnwuWedstrijdDeelnemerInput>
{
    private readonly IEntityGateway<KnwuWedstrijd> wedstrijdGateway;

    public CreateKnwuWedstrijdDeelnemerInputValidator(IEntityGateway<KnwuWedstrijd> wedstrijdGateway)
    {
        this.wedstrijdGateway = wedstrijdGateway;

        RuleFor(input => input.WedstrijdId)
            .NotEmpty();

        RuleFor(input => input)
            .Must(NotBeRegistered)
            .WithMessage("Deelnemer is al geregistreerd");

        RuleFor(input => input.KnwuId)
            .Length(8)
            //.DigitsOnly()
            .When(input => input.UciId == null);

        RuleFor(input => input.UciId)
            .Matches(@"^(?:[A-Z]{2}\d{9}|\d{11})$")
            .When(input => input.KnwuId == null);
    }

    private bool NotBeRegistered(CreateKnwuWedstrijdDeelnemerInput input) =>
        !wedstrijdGateway.Find(input.WedstrijdId)
            .Deelnemers
            .Any(deelnemer =>
                (deelnemer.KnwuId != null && deelnemer.KnwuId == input.KnwuId) ||
                (deelnemer.UciId != null && deelnemer.UciId == input.UciId));
}
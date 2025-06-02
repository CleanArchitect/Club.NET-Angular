using Clean.Net;
using FluentValidation;

namespace Domain;

internal sealed class CreateKnwuWedstrijdCategorieDeelnemerInputValidator : AbstractValidator<CreateKnwuWedstrijdCategorieDeelnemerInput>
{
    private readonly IEntityGateway<KnwuWedstrijd> wedstrijdGateway;

    public CreateKnwuWedstrijdCategorieDeelnemerInputValidator(IEntityGateway<KnwuWedstrijd> wedstrijdGateway)
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
            .When(input => string.IsNullOrWhiteSpace(input.UciId));

        RuleFor(input => input.UciId)
            .Matches(@"^(?:[A-Z]{2}\d{9}|\d{11})$")
            .When(input => string.IsNullOrWhiteSpace(input.KnwuId));
    }

    private bool NotBeRegistered(CreateKnwuWedstrijdCategorieDeelnemerInput input) =>
        !wedstrijdGateway
            .Find(input.WedstrijdId).Categorieen
            .Single(categorie => categorie.Id == input.CategorieId).Deelnemers
            .Any(deelnemer =>
                (deelnemer.KnwuId != null && deelnemer.KnwuId == input.KnwuId) ||
                (deelnemer.UciId != null && deelnemer.UciId == input.UciId));
}
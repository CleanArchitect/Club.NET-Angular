using FluentValidation;

namespace Domain;

internal sealed class CreateKnwuWedstrijdCategorieInputValidator : AbstractValidator<CreateKnwuWedstrijdCategorieInput>
{
    public CreateKnwuWedstrijdCategorieInputValidator()
    {
        RuleFor(input => input.Naam)
            .NotEmpty();

        RuleFor(input => input.Bedrag)
            .NotEmpty();

        RuleFor(input => input.StartnummerBegin)
            .NotEmpty();

        RuleFor(input => input.StartnummerEind)
            .NotEmpty();
    }
}
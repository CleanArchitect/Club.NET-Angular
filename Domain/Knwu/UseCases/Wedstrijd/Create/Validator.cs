using FluentValidation;

namespace Domain;

internal sealed class CreateKnwuWedstrijdInputValidator : AbstractValidator<CreateKnwuWedstrijdInput>
{
    public CreateKnwuWedstrijdInputValidator()
    {
        RuleFor(input => input.KnwuWedstrijdnummer)
            .NotEmpty();

        RuleFor(input => input.Bedrag)
            .NotEmpty();

        RuleFor(input => input.Categorieen)
            .NotEmpty();
    }
}
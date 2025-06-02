using FluentValidation;

namespace Domain;

internal sealed class CreateKnwuWedstrijdInputValidator : AbstractValidator<CreateKnwuWedstrijdInput>
{
    public CreateKnwuWedstrijdInputValidator(IValidator<CreateKnwuWedstrijdCategorieInput> categorieValidator)
    {
        RuleFor(input => input.KnwuWedstrijdnummer)
            .NotEmpty();

        RuleFor(input => input.Categorieen)
            .NotEmpty();

        RuleForEach(input => input.Categorieen)
            .NotEmpty()
            .SetValidator(categorieValidator);
    }
}
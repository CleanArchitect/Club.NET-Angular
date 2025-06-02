using FluentValidation;

namespace Domain;

internal sealed class UpdateKnwuWedstrijdDeelnemerStartnummerInputValidator : AbstractValidator<UpdateKnwuWedstrijdCategorieDeelnemerStartnummerInput>
{
    public UpdateKnwuWedstrijdDeelnemerStartnummerInputValidator()
    {
        RuleFor(input => input.CategorieId)
            .NotEmpty();
    }
}
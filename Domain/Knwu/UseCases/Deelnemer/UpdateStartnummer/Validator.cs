using FluentValidation;

namespace Domain;

internal sealed class UpdateKnwuWedstrijdDeelnemerStartnummerInputValidator : AbstractValidator<UpdateKnwuWedstrijdDeelnemerStartnummerInput>
{
    public UpdateKnwuWedstrijdDeelnemerStartnummerInputValidator()
    {
        RuleFor(input => input.CategorieId)
            .NotEmpty();
    }
}
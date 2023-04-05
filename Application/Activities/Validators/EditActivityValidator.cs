using Application.Activities.Commands;
using FluentValidation;

namespace Application.Activities.Validators;

public class EditActivityValidator : AbstractValidator<EditActivityCommand>
{
    public EditActivityValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.Title).NotEmpty();
        RuleFor(x => x.Date).NotEmpty();
        RuleFor(x => x.Description).NotEmpty();
        RuleFor(x => x.Category).NotEmpty();
        RuleFor(x => x.City).NotEmpty();
        RuleFor(x => x.Venue).NotEmpty();
    }
}
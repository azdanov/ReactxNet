using Application.Core;
using Mediator;

namespace Application.Activities.Commands;

public record CreateActivityCommand(
    Guid Id,
    string Title,
    DateTime Date,
    string Description,
    string Category,
    string City,
    string Venue
) : ICommand<Result<Unit>>;
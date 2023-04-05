using Application.Core;
using Mediator;

namespace Application.Activities.Commands;

public record DeleteActivityCommand(Guid Id) : ICommand<Result<Unit>>;
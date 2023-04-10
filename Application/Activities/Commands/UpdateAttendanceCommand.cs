using Application.Core;
using Mediator;

namespace Application.Activities.Commands;

public record UpdateAttendanceCommand(Guid Id) : ICommand<Result<Unit>>;
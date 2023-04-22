using Application.Core;
using Mediator;

namespace Application.Followers.Commands;

public record ToggleFollowUserCommand(
    string TargetUsername
) : ICommand<Result<Unit>>;
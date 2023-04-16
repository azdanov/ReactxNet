using Application.Core;
using Mediator;

namespace Application.Profiles.Commands;

public record UpdateProfileCommand(
    string DisplayName,
    string? Bio
) : ICommand<Result<Unit>>;
using Application.Core;
using Mediator;

namespace Application.Photos.Commands;

public record SetMainPhotoCommand(string Id) : ICommand<Result<Unit>>;
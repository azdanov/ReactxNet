using Application.Core;
using Mediator;

namespace Application.Photos.Commands;

public record DeletePhotoCommand(string Id) : ICommand<Result<Unit>>;
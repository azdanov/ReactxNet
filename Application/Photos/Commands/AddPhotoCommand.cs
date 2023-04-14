using Application.Core;
using Application.Photos.Dto;
using Mediator;
using Microsoft.AspNetCore.Http;

namespace Application.Photos.Commands;

public record AddPhotoCommand(IFormFile File) : ICommand<Result<PhotoDto>>;
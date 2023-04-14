using Application.Core;
using Application.Interfaces;
using Application.Mappers;
using Application.Photos.Commands;
using Application.Photos.Dto;
using Application.Photos.Services;
using Domain;
using Mediator;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos.Handlers;

public class AddPhotoHandler : ICommandHandler<AddPhotoCommand, Result<PhotoDto>>
{
    private readonly DataContext _context;
    private readonly IPhotoService _photoService;
    private readonly IUserAccessor _userAccessor;

    public AddPhotoHandler(DataContext context, IPhotoService photoService, IUserAccessor userAccessor)
    {
        _userAccessor = userAccessor;
        _context = context;
        _photoService = photoService;
    }

    public async ValueTask<Result<PhotoDto>> Handle(AddPhotoCommand request, CancellationToken cancellationToken)
    {
        var photoUploadResult = await _photoService.AddPhoto(request.File);
        if (photoUploadResult == null) return Result<PhotoDto>.Failure("Problem adding photo");

        var user = await _context.Users
            .Include(u => u.Photos)
            .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUsername(), cancellationToken);
        if (user == null) return Result<PhotoDto>.Failure("User not found");

        var photo = new Photo
        {
            Url = photoUploadResult.Url,
            Id = photoUploadResult.PublicId
        };

        if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;

        user.Photos.Add(photo);

        var result = await _context.SaveChangesAsync(cancellationToken) > 0;

        return result
            ? Result<PhotoDto>.Success(PhotoMapper.MapToPhotoDto(photo))
            : Result<PhotoDto>.Failure("Problem adding photo");
    }
}
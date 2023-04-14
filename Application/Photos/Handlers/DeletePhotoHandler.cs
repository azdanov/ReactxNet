using Application.Core;
using Application.Interfaces;
using Application.Photos.Commands;
using Application.Photos.Services;
using Mediator;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos.Handlers;

public class DeletePhotoHandler : ICommandHandler<DeletePhotoCommand, Result<Unit>>
{
    private readonly DataContext _context;
    private readonly IPhotoService _photoService;
    private readonly IUserAccessor _userAccessor;

    public DeletePhotoHandler(DataContext context, IUserAccessor userAccessor, IPhotoService photoService)
    {
        _photoService = photoService;
        _userAccessor = userAccessor;
        _context = context;
    }

    public async ValueTask<Result<Unit>> Handle(DeletePhotoCommand request, CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .Include(p => p.Photos)
            .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername(), cancellationToken);
        if (user == null) return Result<Unit>.Failure("User not found");

        var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);
        if (photo == null) return Result<Unit>.Failure("Photo not found");
        if (photo.IsMain) return Result<Unit>.Failure("You cannot delete your main photo");

        var result = await _photoService.DeletePhoto(photo.Id);
        if (result == null) return Result<Unit>.Failure("Problem deleting photo");

        user.Photos.Remove(photo);
        _context.Remove(photo);

        var success = await _context.SaveChangesAsync(cancellationToken) > 0;

        return success
            ? Result<Unit>.Success(Unit.Value)
            : Result<Unit>.Failure("Problem deleting photo");
    }
}
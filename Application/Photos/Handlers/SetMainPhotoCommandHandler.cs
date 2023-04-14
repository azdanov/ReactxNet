using Application.Core;
using Application.Interfaces;
using Application.Photos.Commands;
using Mediator;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos.Handlers;

public class SetMainPhotoCommandHandler : ICommandHandler<SetMainPhotoCommand, Result<Unit>>
{
    private readonly DataContext _context;
    private readonly IUserAccessor _userAccessor;

    public SetMainPhotoCommandHandler(DataContext context, IUserAccessor userAccessor)
    {
        _userAccessor = userAccessor;
        _context = context;
    }

    public async ValueTask<Result<Unit>> Handle(SetMainPhotoCommand request, CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .Include(p => p.Photos)
            .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername(), cancellationToken);
        if (user == null) return Result<Unit>.Failure("User not found");

        var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);
        if (photo == null) return Result<Unit>.Failure("Photo not found");

        var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
        if (currentMain != null) currentMain.IsMain = false;

        photo.IsMain = true;
        var success = await _context.SaveChangesAsync(cancellationToken) > 0;

        return success
            ? Result<Unit>.Success(Unit.Value)
            : Result<Unit>.Failure("Problem setting main photo");
    }
}
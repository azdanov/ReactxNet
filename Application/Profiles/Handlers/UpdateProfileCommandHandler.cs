using Application.Core;
using Application.Interfaces;
using Application.Profiles.Commands;
using Mediator;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Handlers;

public class UpdateProfileCommandHandler : ICommandHandler<UpdateProfileCommand, Result<Unit>>
{
    private readonly DataContext _context;
    private readonly IUserAccessor _userAccessor;

    public UpdateProfileCommandHandler(DataContext context, IUserAccessor userAccessor)
    {
        _context = context;
        _userAccessor = userAccessor;
    }

    public async ValueTask<Result<Unit>> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUsername(), cancellationToken);
        if (user == null) return Result<Unit>.Failure("User not found");

        user.DisplayName = request.DisplayName;
        user.Bio = request.Bio ?? user.Bio;

        var result = await _context.SaveChangesAsync(cancellationToken) > 0;

        return result
            ? Result<Unit>.Success(Unit.Value)
            : Result<Unit>.Failure("Failed to update profile");
    }
}
using Application.Core;
using Application.Followers.Commands;
using Application.Interfaces;
using Domain;
using Mediator;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers.Handlers;

public class ToggleFollowUserCommandHandler : ICommandHandler<ToggleFollowUserCommand, Result<Unit>>
{
    private readonly DataContext _context;
    private readonly IUserAccessor _userAccessor;

    public ToggleFollowUserCommandHandler(DataContext context, IUserAccessor userAccessor)
    {
        _userAccessor = userAccessor;
        _context = context;
    }

    public async ValueTask<Result<Unit>> Handle(ToggleFollowUserCommand request, CancellationToken cancellationToken)
    {
        var source = await _context.Users.FirstOrDefaultAsync(x =>
            x.UserName == _userAccessor.GetCurrentUsername(), cancellationToken);
        if (source == null) return Result<Unit>.Failure("Source user not found");

        var target = await _context.Users.FirstOrDefaultAsync(x =>
            x.UserName == request.TargetUsername, cancellationToken);

        if (target == null) return Result<Unit>.Failure("Target user not found");

        var following =
            await _context.UserFollowings.FindAsync(new object?[] { source.Id, target.Id }, cancellationToken);

        if (following == null)
        {
            following = new UserFollowing
            {
                Source = source,
                Target = target
            };

            _context.UserFollowings.Add(following);
        }
        else
        {
            _context.UserFollowings.Remove(following);
        }

        var success = await _context.SaveChangesAsync(cancellationToken) > 0;

        return success
            ? Result<Unit>.Success(Unit.Value)
            : Result<Unit>.Failure("Failed to update following");
    }
}
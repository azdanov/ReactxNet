using Application.Core;
using Application.Followers.Commands;
using Application.Interfaces;
using Application.Mappers;
using Application.Profiles.Dto;
using Mediator;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers.Handlers;

public class ListFollowersCommandHandler : ICommandHandler<ListFollowersCommand, Result<List<ProfileDto>>>
{
    private readonly DataContext _context;
    private readonly IUserAccessor _userAccessor;

    public ListFollowersCommandHandler(DataContext context, IUserAccessor userAccessor)
    {
        _userAccessor = userAccessor;
        _context = context;
    }

    public async ValueTask<Result<List<ProfileDto>>> Handle(ListFollowersCommand request,
        CancellationToken cancellationToken)
    {
        var profiles = new List<ProfileDto>();

        switch (request.Filter)
        {
            case "followers":
                profiles = await _context.UserFollowings
                    .Where(uf => uf.Target.UserName == request.Username)
                    .Select(uf => uf.Source)
                    .ProjectToProfileDto(_userAccessor.GetCurrentUsername())
                    .ToListAsync(cancellationToken);
                break;
            case "following":
                profiles = await _context.UserFollowings
                    .Where(uf => uf.Source.UserName == request.Username)
                    .Select(uf => uf.Target)
                    .ProjectToProfileDto(_userAccessor.GetCurrentUsername())
                    .ToListAsync(cancellationToken);
                break;
        }

        return Result<List<ProfileDto>>.Success(profiles);
    }
}
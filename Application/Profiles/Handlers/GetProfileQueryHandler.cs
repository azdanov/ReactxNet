using Application.Core;
using Application.Interfaces;
using Application.Mappers;
using Application.Profiles.Dto;
using Application.Profiles.Queries;
using Mediator;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Handlers;

public class GetProfileQueryHandler : IQueryHandler<GetProfileQuery, Result<ProfileDto>>
{
    private readonly DataContext _context;
    private readonly IUserAccessor _userAccessor;

    public GetProfileQueryHandler(DataContext context, IUserAccessor userAccessor)
    {
        _context = context;
        _userAccessor = userAccessor;
    }

    public async ValueTask<Result<ProfileDto>> Handle(GetProfileQuery request, CancellationToken cancellationToken)
    {
        var profile = await _context.Users
            .Where(u => u.UserName == request.Username)
            .ProjectToProfileDto(_userAccessor.GetCurrentUsername())
            .FirstOrDefaultAsync(cancellationToken);

        return profile == null
            ? Result<ProfileDto>.Failure("Profile not found")
            : Result<ProfileDto>.Success(profile);
    }
}
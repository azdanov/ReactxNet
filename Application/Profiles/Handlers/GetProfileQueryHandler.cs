using Application.Core;
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

    public GetProfileQueryHandler(DataContext context)
    {
        _context = context;
    }

    public async ValueTask<Result<ProfileDto>> Handle(GetProfileQuery request, CancellationToken cancellationToken)
    {
        var profile = await _context.Users
            .Where(u => u.UserName == request.Username)
            .ProjectToProfileDto()
            .FirstOrDefaultAsync(cancellationToken);

        return profile == null
            ? Result<ProfileDto>.Failure("Profile not found")
            : Result<ProfileDto>.Success(profile);
    }
}
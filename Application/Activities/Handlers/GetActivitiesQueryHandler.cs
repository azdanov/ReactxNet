using Application.Activities.Dtos;
using Application.Activities.Queries;
using Application.Core;
using Application.Interfaces;
using Application.Mappers;
using Mediator;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Handlers;

internal class GetActivitiesQueryHandler : IQueryHandler<GetActivitiesQuery, Result<List<ActivityDto>>>
{
    private readonly DataContext _context;
    private readonly IUserAccessor _userAccessor;

    public GetActivitiesQueryHandler(DataContext context, IUserAccessor userAccessor)
    {
        _context = context;
        _userAccessor = userAccessor;
    }

    public async ValueTask<Result<List<ActivityDto>>> Handle(GetActivitiesQuery request,
        CancellationToken cancellationToken)
    {
        var activities = await _context.Activities
            .ProjectToActivityDto(_userAccessor.GetCurrentUsername())
            .ToListAsync(cancellationToken);

        return Result<List<ActivityDto>>.Success(activities);
    }
}
using Application.Activities.Dtos;
using Application.Activities.Queries;
using Application.Core;
using Application.Interfaces;
using Application.Mappers;
using Mediator;
using Persistence;

namespace Application.Activities.Handlers;

internal class GetActivitiesQueryHandler : IQueryHandler<GetActivitiesQuery, Result<PagedList<ActivityDto>>>
{
    private readonly DataContext _context;
    private readonly IUserAccessor _userAccessor;

    public GetActivitiesQueryHandler(DataContext context, IUserAccessor userAccessor)
    {
        _context = context;
        _userAccessor = userAccessor;
    }

    public async ValueTask<Result<PagedList<ActivityDto>>> Handle(GetActivitiesQuery request,
        CancellationToken cancellationToken)
    {
        var activitiesQueryable = _context.Activities
            .Where(a => a.Date >= request.Params.StartDate)
            .OrderBy(a => a.Date)
            .ProjectToActivityDto(_userAccessor.GetCurrentUsername())
            .AsQueryable();

        if (request.Params is { IsGoing: true, IsHost: false })
        {
            activitiesQueryable = activitiesQueryable
                .Where(ac =>
                    ac.Attendees.Any(at => at.Username == _userAccessor.GetCurrentUsername()));
        }

        if (request.Params is { IsGoing: false, IsHost: true })
        {
            activitiesQueryable = activitiesQueryable
                .Where(ac => ac.HostUsername == _userAccessor.GetCurrentUsername());
        }

        return Result<PagedList<ActivityDto>>.Success(await PagedList<ActivityDto>
            .CreateAsync(activitiesQueryable, request.Params.PageNumber, request.Params.PageSize));
    }
}
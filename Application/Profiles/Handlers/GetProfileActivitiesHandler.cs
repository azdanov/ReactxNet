using Application.Core;
using Application.Mappers;
using Application.Profiles.Dto;
using Application.Profiles.Queries;
using Mediator;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Handlers;

public class GetProfileActivitiesHandler : IQueryHandler<GetProfileActivities, Result<List<UserActivityDto>>>
{
    private readonly DataContext _context;

    public GetProfileActivitiesHandler(DataContext context)
    {
        _context = context;
    }

    public async ValueTask<Result<List<UserActivityDto>>> Handle(GetProfileActivities request,
        CancellationToken cancellationToken)
    {
        var query = _context.ActivityAttendees
            .Where(aa => aa.User.UserName == request.Username)
            .OrderBy(aa => aa.Activity.Date)
            .ProjectToUserActivityDto()
            .AsQueryable();

        var today = DateTime.UtcNow;
        query = request.Filter switch
        {
            "hosting" => query.Where(a => a.HostUsername == request.Username),
            "past" => query.Where(a => a.Date <= today),
            _ => query.Where(a => a.Date >= today)
        };

        var activities = await query.ToListAsync(cancellationToken);

        return Result<List<UserActivityDto>>.Success(activities);
    }
}
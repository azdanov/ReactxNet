using Application.Activities.Dtos;
using Application.Activities.Queries;
using Application.Core;
using Application.Mappers;
using Mediator;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Handlers;

internal class GetActivitiesQueryHandler : IQueryHandler<GetActivitiesQuery, Result<List<ActivityDto>>>
{
    private readonly DataContext _context;

    public GetActivitiesQueryHandler(DataContext context)
    {
        _context = context;
    }

    public async ValueTask<Result<List<ActivityDto>>> Handle(GetActivitiesQuery request,
        CancellationToken cancellationToken)
    {
        var activities = await _context.Activities
            .ProjectToActivityDto()
            .ToListAsync(cancellationToken);

        return Result<List<ActivityDto>>.Success(activities);
    }
}
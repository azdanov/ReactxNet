using Application.Activities.Dtos;
using Application.Activities.Queries;
using Application.Core;
using Application.Mappers;
using Mediator;
using Persistence;

namespace Application.Activities.Handlers;

internal class GetActivityQueryHandler : IQueryHandler<GetActivityQuery, Result<ActivityDto>>
{
    private readonly DataContext _context;

    public GetActivityQueryHandler(DataContext context)
    {
        _context = context;
    }

    public async ValueTask<Result<ActivityDto>> Handle(GetActivityQuery request, CancellationToken cancellationToken)
    {
        var activity = await _context.Activities.FindAsync(new object[] { request.Id }, cancellationToken);

        return activity is null
            ? Result<ActivityDto>.Failure("Activity not found.")
            : Result<ActivityDto>.Success(ActivityMapper.MapToActivityDto(activity));
    }
}
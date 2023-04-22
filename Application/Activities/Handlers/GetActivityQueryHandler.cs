using Application.Activities.Dtos;
using Application.Activities.Queries;
using Application.Core;
using Application.Interfaces;
using Application.Mappers;
using Mediator;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Handlers;

internal class GetActivityQueryHandler : IQueryHandler<GetActivityQuery, Result<ActivityDto>>
{
    private readonly DataContext _context;
    private readonly IUserAccessor _userAccessor;

    public GetActivityQueryHandler(DataContext context, IUserAccessor userAccessor)
    {
        _context = context;
        _userAccessor = userAccessor;
    }

    public async ValueTask<Result<ActivityDto>> Handle(GetActivityQuery request, CancellationToken cancellationToken)
    {
        var activity = await _context.Activities
            .Where(a => a.Id == request.Id)
            .ProjectToActivityDto(_userAccessor.GetCurrentUsername())
            .FirstOrDefaultAsync(cancellationToken);

        return activity is null
            ? Result<ActivityDto>.Failure("Activity not found.")
            : Result<ActivityDto>.Success(activity);
    }
}
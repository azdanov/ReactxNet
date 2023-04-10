using Application.Activities.Commands;
using Application.Core;
using Application.Interfaces;
using Application.Mappers;
using Domain;
using Mediator;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Handlers;

internal class CreateActivityCommandHandler : ICommandHandler<CreateActivityCommand, Result<Unit>>
{
    private readonly DataContext _context;
    private readonly IUserAccessor _userAccessor;

    public CreateActivityCommandHandler(DataContext context, IUserAccessor userAccessor)
    {
        _context = context;
        _userAccessor = userAccessor;
    }

    public async ValueTask<Result<Unit>> Handle(CreateActivityCommand request, CancellationToken cancellationToken)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername(),
            cancellationToken);

        var activity = ActivityMapper.MapToActivity(request);
        activity.Attendees.Add(new ActivityAttendee
        {
            User = user!,
            Activity = activity,
            IsHost = true
        });
        _context.Activities.Add(activity);

        var result = await _context.SaveChangesAsync(cancellationToken);

        return result > 0
            ? Result<Unit>.Success(Unit.Value)
            : Result<Unit>.Failure("Failed to create activity.");
    }
}
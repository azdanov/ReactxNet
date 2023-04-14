using Application.Activities.Commands;
using Application.Core;
using Application.Interfaces;
using Domain;
using Mediator;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Handlers;

public class UpdateAttendanceHandler : ICommandHandler<UpdateAttendanceCommand, Result<Unit>>
{
    private readonly DataContext _context;
    private readonly IUserAccessor _userAccessor;

    public UpdateAttendanceHandler(DataContext context, IUserAccessor userAccessor)
    {
        _userAccessor = userAccessor;
        _context = context;
    }

    public async ValueTask<Result<Unit>> Handle(UpdateAttendanceCommand request, CancellationToken cancellationToken)
    {
        var activity = await _context.Activities
            .Include(a => a.Attendees)
            .ThenInclude(aa => aa.User)
            .Where(a => a.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);
        if (activity == null) return Result<Unit>.Failure("Activity not found");

        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUsername(),
            cancellationToken);
        if (user == null) return Result<Unit>.Failure("User not found");

        var attendance = activity.Attendees.FirstOrDefault(aa => aa.User.UserName == user.UserName);

        if (attendance != null)
        {
            var isHost = activity.Attendees.FirstOrDefault(aa => aa.IsHost)?.User.UserName == user.UserName;

            if (isHost)
                activity.IsCancelled = !activity.IsCancelled;
            else
                activity.Attendees.Remove(attendance);
        }
        else
        {
            attendance = new ActivityAttendee
            {
                User = user,
                Activity = activity,
                IsHost = false
            };
            activity.Attendees.Add(attendance);
        }

        var result = await _context.SaveChangesAsync(cancellationToken) > 0;

        return result
            ? Result<Unit>.Success(Unit.Value)
            : Result<Unit>.Failure("Unable to update attendance");
    }
}
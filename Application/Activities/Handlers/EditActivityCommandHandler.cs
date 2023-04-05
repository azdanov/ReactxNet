using Application.Activities.Commands;
using Application.Core;
using Application.Mappers;
using Mediator;
using Persistence;

namespace Application.Activities.Handlers;

internal class EditActivityCommandHandler : ICommandHandler<EditActivityCommand, Result<Unit>>
{
    private readonly DataContext _context;

    public EditActivityCommandHandler(DataContext context)
    {
        _context = context;
    }

    public async ValueTask<Result<Unit>> Handle(EditActivityCommand request, CancellationToken cancellationToken)
    {
        var activity = await _context.Activities.FindAsync(new object[] { request.Id }, cancellationToken);
        if (activity == null)
        {
            return Result<Unit>.Failure($"Activity with id {request.Id} not found.");
        }

        ActivityMapper.ActivityDtoToActivity(request, activity);

        var result = await _context.SaveChangesAsync(cancellationToken);

        if (result <= 0)
        {
            // Ignore the return value of SaveChangesAsync because if it was 0, it means that no changes were made
            // to the database, since the activity didn't change. In that case, we still want to return a success result.
        }

        return Result<Unit>.Success(Unit.Value);
    }
}
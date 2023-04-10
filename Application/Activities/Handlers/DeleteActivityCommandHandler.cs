using Application.Activities.Commands;
using Application.Core;
using Mediator;
using Persistence;

namespace Application.Activities.Handlers;

internal class DeleteActivityCommandHandler : ICommandHandler<DeleteActivityCommand, Result<Unit>>
{
    private readonly DataContext _context;

    public DeleteActivityCommandHandler(DataContext context)
    {
        _context = context;
    }

    public async ValueTask<Result<Unit>> Handle(DeleteActivityCommand request, CancellationToken cancellationToken)
    {
        var activity = await _context.Activities.FindAsync(new object[] { request.Id }, cancellationToken);
        if (activity == null) return Result<Unit>.Failure($"Activity with id {request.Id} not found.");

        _context.Activities.Remove(activity);
        var result = await _context.SaveChangesAsync(cancellationToken);

        if (result <= 0)
        {
            // Ignore the return value of SaveChangesAsync because if it was 0, it means that no changes were made
            // to the database. In that case, we still want to return a success result.
        }

        return Result<Unit>.Success(Unit.Value);
    }
}
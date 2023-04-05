using Application.Activities.Commands;
using Application.Core;
using Application.Mappers;
using Mediator;
using Persistence;

namespace Application.Activities.Handlers;

internal class CreateActivityCommandHandler : ICommandHandler<CreateActivityCommand, Result<Unit>>
{
    private readonly DataContext _context;

    public CreateActivityCommandHandler(DataContext context)
    {
        _context = context;
    }

    public async ValueTask<Result<Unit>> Handle(CreateActivityCommand request, CancellationToken cancellationToken)
    {
        var activity = ActivityMapper.MapToActivity(request);
        _context.Activities.Add(activity);

        var result = await _context.SaveChangesAsync(cancellationToken);

        return result > 0
            ? Result<Unit>.Success(Unit.Value)
            : Result<Unit>.Failure("Failed to create activity.");
    }
}
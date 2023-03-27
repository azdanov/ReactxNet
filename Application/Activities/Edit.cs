using Application.Dtos;
using Application.Mappers;
using Mediator;
using Persistence;

namespace Application.Activities;

public class Edit
{
    public class Command : IRequest
    {
        public required ActivityDto Activity { get; init; }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async ValueTask<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(new object[] { request.Activity.Id }, cancellationToken);
            if (activity == null)
            {
                throw new ArgumentException(nameof(request.Activity.Id));
            }

            ActivityMapper.ActivityDtoToActivity(request.Activity, activity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
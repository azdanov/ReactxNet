using Mediator;
using Persistence;

namespace Application.Activities;

public class Delete
{
    public class Command : IRequest
    {
        public required Guid Id { get; init; }
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
            var activity = await _context.Activities.FindAsync(new object[] { request.Id }, cancellationToken);
            if (activity == null)
            {
                throw new ArgumentException(nameof(request.Id));
            }

            _context.Activities.Remove(activity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
using Application.Dtos;
using Application.Mappers;
using Mediator;
using Persistence;

namespace Application.Activities;

public class Details
{
    public class Query : IRequest<ActivityDto?>
    {
        public required Guid Id { get; init; }
    }

    public class Handler : IRequestHandler<Query, ActivityDto?>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async ValueTask<ActivityDto?> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(new object[] { request.Id }, cancellationToken);
            return activity == null ? null : ActivityMapper.MapToActivityDto(activity);
        }
    }
}
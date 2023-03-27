using Application.Dtos;
using Application.Mappers;
using Mediator;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities;

public class List
{
    public class Query : IRequest<List<ActivityDto>>
    {
    }

    public class Handler : IRequestHandler<Query, List<ActivityDto>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async ValueTask<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activities = await _context.Activities.ToListAsync(cancellationToken);
            return ActivityMapper.MapToActivityDtoList(activities);
        }
    }
}
﻿using Domain;
using Mediator;
using Persistence;

namespace Application.Activities;

public class Details
{
    public class Query : IRequest<Activity?>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Activity?>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async ValueTask<Activity?> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _context.Activities.FindAsync(new object[] { request.Id }, cancellationToken);
        }
    }
}
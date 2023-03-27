﻿using Application.Dtos;
using Application.Mappers;
using Mediator;
using Persistence;

namespace Application.Activities;

public class Create
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
            var activity = ActivityMapper.MapToActivity(request.Activity);
            _context.Activities.Add(activity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
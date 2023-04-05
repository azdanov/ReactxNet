using Application.Activities.Dtos;
using Application.Core;
using Mediator;

namespace Application.Activities.Queries;

public record GetActivityQuery(Guid Id) : IQuery<Result<ActivityDto>>;
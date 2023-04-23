using Application.Activities.Dtos;
using Application.Core;
using Mediator;

namespace Application.Activities.Queries;

public record GetActivitiesQuery(ActivityParams Params) : IQuery<Result<PagedList<ActivityDto>>>;
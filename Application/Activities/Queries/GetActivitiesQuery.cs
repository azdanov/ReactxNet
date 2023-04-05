using Application.Activities.Dtos;
using Application.Core;
using Mediator;

namespace Application.Activities.Queries;

public class GetActivitiesQuery : IQuery<Result<List<ActivityDto>>>
{
}
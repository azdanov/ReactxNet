using Application.Core;
using Application.Profiles.Dto;
using Mediator;

namespace Application.Profiles.Queries;

public record GetProfileActivities(string Username, string Filter) : IQuery<Result<List<UserActivityDto>>>;
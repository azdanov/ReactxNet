using Application.Core;
using Application.Profiles.Dto;
using Mediator;

namespace Application.Profiles.Queries;

public record GetProfileQuery(string Username) : IQuery<Result<ProfileDto>>;
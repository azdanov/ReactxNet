using Application.Core;
using Application.Profiles.Dto;
using Mediator;

namespace Application.Followers.Commands;

public record ListFollowersCommand(
    string Predicate,
    string Username
) : ICommand<Result<List<ProfileDto>>>;
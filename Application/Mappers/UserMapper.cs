using Application.Profiles.Dto;
using Domain;
using Riok.Mapperly.Abstractions;

namespace Application.Mappers;

[Mapper]
internal static partial class UserMapper
{
    public static IQueryable<ProfileDto> ProjectToProfileDto(this IQueryable<User> userQuery,
        string? currentUsername = default)
    {
        return userQuery.Select(user => new ProfileDto
        {
            Username = user.UserName,
            DisplayName = user.DisplayName,
            Bio = user.Bio,
            Following = user.Followers.Any(f => f.Source.UserName == currentUsername),
            FollowersCount = user.Followers.Count,
            FollowingCount = user.Followings.Count,
            Image = user.Photos.FirstOrDefault(u => u.IsMain) == null
                ? null
                : user.Photos.FirstOrDefault(u => u.IsMain)!.Url,
            Photos = user.Photos
        });
    }
}
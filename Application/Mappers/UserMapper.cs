using Application.Profiles.Dto;
using Domain;
using Riok.Mapperly.Abstractions;

namespace Application.Mappers;

[Mapper]
internal static partial class UserMapper
{
    public static IQueryable<ProfileDto> ProjectToProfileDto(this IQueryable<User> userQuery)
    {
        return userQuery.Select(user => new ProfileDto
        {
            Username = user.UserName,
            DisplayName = user.DisplayName,
            Bio = user.Bio,
            Image = user.Photos.FirstOrDefault(u => u.IsMain) == null
                ? null
                : user.Photos.FirstOrDefault(u => u.IsMain)!.Url,
            Photos = user.Photos
        });
    }
}
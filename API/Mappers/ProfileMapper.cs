using API.Requests;
using API.Responses;
using Application.Profiles.Commands;
using Application.Profiles.Dto;
using Riok.Mapperly.Abstractions;

namespace API.Mappers;

[Mapper]
internal static partial class ProfileMapper
{
    public static partial ProfileResponse MapToProfileResponse(ProfileDto profile);

    public static partial UpdateProfileCommand MapToUpdateProfileCommand(UpdateProfileRequest request);
}
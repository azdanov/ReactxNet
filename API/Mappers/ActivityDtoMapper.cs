using API.Requests;
using API.Responses;
using Application.Dtos;
using Riok.Mapperly.Abstractions;

namespace API.Mappers;

[Mapper]
internal static partial class ActivityDtoMapper
{
    public static partial ActivityResponse MapToActivityResponse(ActivityDto activity);

    public static partial List<ActivityResponse> MapToActivityResponseList(List<ActivityDto> activities);

    public static partial ActivityDto MapToActivityDto(CreateActivityRequest request);

    public static partial ActivityDto MapToActivityDto(UpdateActivityRequest request);
}
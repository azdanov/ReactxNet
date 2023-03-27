using Application.Dtos;
using Domain;
using Riok.Mapperly.Abstractions;

namespace Application.Mappers;

[Mapper]
internal static partial class ActivityMapper
{
    public static partial void ActivityDtoToActivity(ActivityDto activityDto, Activity activity);

    public static partial ActivityDto MapToActivityDto(Activity activity);

    public static partial Activity MapToActivity(ActivityDto activityDto);

    public static partial List<ActivityDto> MapToActivityDtoList(List<Activity> activities);
}
using Application.Activities.Commands;
using Application.Activities.Dtos;
using Domain;
using Riok.Mapperly.Abstractions;

namespace Application.Mappers;

[Mapper]
internal static partial class ActivityMapper
{
    public static partial void ActivityDtoToActivity(EditActivityCommand activityCommand, Activity activity);

    public static partial ActivityDto MapToActivityDto(Activity activity);

    public static partial Activity MapToActivity(CreateActivityCommand activityCommand);

    public static partial List<ActivityDto> MapToActivityDtoList(List<Activity> activities);
}
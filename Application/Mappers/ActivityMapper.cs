using Application.Activities.Commands;
using Application.Activities.Dtos;
using Domain;
using Riok.Mapperly.Abstractions;

namespace Application.Mappers;

[Mapper]
internal static partial class ActivityMapper
{
    public static partial void ActivityDtoToActivity(EditActivityCommand activityCommand, Activity activity);

    public static ActivityDto MapToActivityDto(Activity activity)
    {
        var activityDto = ActivityToActivityDto(activity);
        activityDto.HostUsername = activity.Attendees
            .FirstOrDefault(x => x.IsHost)?.User.UserName;

        return activityDto;
    }

    [MapperIgnoreTarget(nameof(ActivityDto.HostUsername))]
    private static partial ActivityDto ActivityToActivityDto(Activity activity);

    public static IQueryable<ActivityDto> ProjectToActivityDto(this IQueryable<Activity> activityQuery)
    {
        return activityQuery.Select(activity => new ActivityDto
        {
            Id = activity.Id,
            Title = activity.Title,
            Description = activity.Description,
            Category = activity.Category,
            City = activity.City,
            Venue = activity.Venue,
            Date = activity.Date,
            IsCancelled = activity.IsCancelled,
            HostUsername = activity.Attendees
                .Where(x => x.IsHost)
                .Select(x => x.User.UserName).FirstOrDefault(),
            Attendees = activity.Attendees.Select(
                activityAttendee => new AttendeeDto
                {
                    Username = activityAttendee.User.UserName,
                    DisplayName = activityAttendee.User.DisplayName,
                    Bio = activityAttendee.User.Bio,
                    Image = null
                }
            ).ToList()
        });
    }

    public static partial Activity MapToActivity(CreateActivityCommand activityCommand);

    public static partial List<ActivityDto> MapToActivityDtoList(List<Activity> activities);

    private static AttendeeDto MapToAttendeeDto(ActivityAttendee activityAttendee)
    {
        return new AttendeeDto
        {
            Username = activityAttendee.User.UserName,
            DisplayName = activityAttendee.User.DisplayName,
            Bio = activityAttendee.User.Bio,
            Image = null
        };
    }
}
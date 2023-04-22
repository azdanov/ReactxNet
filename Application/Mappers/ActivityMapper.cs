using Application.Activities.Commands;
using Application.Activities.Dtos;
using Domain;
using Riok.Mapperly.Abstractions;

namespace Application.Mappers;

[Mapper]
internal static partial class ActivityMapper
{
    public static partial void ActivityDtoToActivity(EditActivityCommand activityCommand, Activity activity);

    public static IQueryable<ActivityDto> ProjectToActivityDto(this IQueryable<Activity> activityQuery,
        string? currentUsername = default)
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
            HostUsername = activity.Attendees.FirstOrDefault(x => x.IsHost) == null
                ? null
                : activity.Attendees.FirstOrDefault(x => x.IsHost)!.User.UserName,
            Attendees = activity.Attendees.Select(
                activityAttendee => new AttendeeDto
                {
                    Username = activityAttendee.User.UserName,
                    DisplayName = activityAttendee.User.DisplayName,
                    Bio = activityAttendee.User.Bio,
                    Following = activityAttendee.User.Followers.Any(f => f.Source.UserName == currentUsername),
                    FollowersCount = activityAttendee.User.Followers.Count,
                    FollowingCount = activityAttendee.User.Followings.Count,
                    Image = activityAttendee.User.Photos.FirstOrDefault(x => x.IsMain) == null
                        ? null
                        : activityAttendee.User.Photos.FirstOrDefault(x => x.IsMain)!.Url
                }
            ).ToList()
        });
    }

    public static partial Activity MapToActivity(CreateActivityCommand activityCommand);
}
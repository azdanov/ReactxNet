using Application.Profiles.Dto;
using Domain;
using Riok.Mapperly.Abstractions;

namespace Application.Mappers;

[Mapper]
internal static partial class ActivityAttendeeMapper
{
    public static IQueryable<UserActivityDto> ProjectToUserActivityDto(
        this IQueryable<ActivityAttendee> activityAttendeeQuery)
    {
        return activityAttendeeQuery.Select(activityAttendee => new UserActivityDto
        {
            Id = activityAttendee.Activity.Id,
            Title = activityAttendee.Activity.Title,
            Category = activityAttendee.Activity.Category,
            Date = activityAttendee.Activity.Date,
            HostUsername = activityAttendee.Activity.Attendees.FirstOrDefault(x => x.IsHost) == null
                ? null
                : activityAttendee.Activity.Attendees.FirstOrDefault(x => x.IsHost)!.User.UserName
        });
    }
}
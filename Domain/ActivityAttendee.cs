namespace Domain;

public class ActivityAttendee
{
    public string UserId { get; set; } = default!;
    public User User { get; set; } = default!;
    public Guid ActivityId { get; set; }
    public Activity Activity { get; set; } = default!;
    public bool IsHost { get; set; }
}
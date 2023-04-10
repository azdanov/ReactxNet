namespace Domain;

public class ActivityAttendee
{
    public string UserId { get; set; } = null!;
    public User User { get; set; } = null!;
    public Guid ActivityId { get; set; }
    public Activity Activity { get; set; } = null!;
    public bool IsHost { get; set; }
}
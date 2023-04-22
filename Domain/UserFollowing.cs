namespace Domain;

public class UserFollowing
{
    public string SourceId { get; set; }
    public User Source { get; set; }
    public string TargetId { get; set; }
    public User Target { get; set; }
}
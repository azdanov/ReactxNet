using Microsoft.AspNetCore.Identity;

namespace Domain;

public sealed class User : IdentityUser
{
    public string DisplayName { get; set; } = null!;
    public override string UserName { get; set; } = null!;
    public override string Email { get; set; } = null!;
    public ICollection<ActivityAttendee> Activities { get; set; } = new List<ActivityAttendee>();
    public string? Bio { get; set; }
    public ICollection<Photo> Photos { get; set; } = new List<Photo>();
    public ICollection<UserFollowing> Followings { get; set; } = new List<UserFollowing>();
    public ICollection<UserFollowing> Followers { get; set; } = new List<UserFollowing>();
}
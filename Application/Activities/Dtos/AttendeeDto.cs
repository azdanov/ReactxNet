namespace Application.Activities.Dtos;

public class AttendeeDto
{
    public string DisplayName { get; set; } = null!;
    public string Username { get; set; } = null!;
    public string? Bio { get; set; }
    public string? Image { get; set; }
    public bool Following { get; set; }
    public int FollowersCount { get; set; }
    public int FollowingCount { get; set; }
}
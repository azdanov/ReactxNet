namespace Application.Activities.Dtos;

public class AttendeeDto
{
    public string DisplayName { get; set; } = null!;
    public string Username { get; set; } = null!;
    public string? Bio { get; set; }
    public string? Image { get; set; }
}
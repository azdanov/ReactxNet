namespace Application.Profiles.Dto;

public class UserActivityDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = default!;
    public string Category { get; set; } = default!;
    public DateTime Date { get; set; }
    public string? HostUsername { get; set; }
}
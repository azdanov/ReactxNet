namespace Application.Activities.Dtos;

public class ActivityDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public DateTime Date { get; set; }
    public string Description { get; set; } = null!;
    public string Category { get; set; } = null!;
    public string City { get; set; } = null!;
    public string Venue { get; set; } = null!;
    public bool IsCancelled { get; set; }
    public string? HostUsername { get; set; }
    public ICollection<AttendeeDto> Attendees { get; set; } = new List<AttendeeDto>();
}
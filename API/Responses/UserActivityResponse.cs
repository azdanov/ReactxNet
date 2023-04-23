namespace API.Responses;

public class UserActivityResponse
{
    public Guid Id { get; set; }
    public string Title { get; set; } = default!;
    public string Category { get; set; } = default!;
    public DateTime Date { get; set; }
}
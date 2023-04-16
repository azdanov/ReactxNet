namespace API.Responses;

public class ProfileResponse
{
    public required string Username { get; set; }
    public required string DisplayName { get; set; }
    public string? Bio { get; set; }
    public string? Image { get; set; }
    public ICollection<PhotoResponse> Photos { get; set; } = new List<PhotoResponse>();
}
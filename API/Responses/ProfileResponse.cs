namespace API.Responses;

public class ProfileResponse
{
    public string Username { get; set; }
    public string DisplayName { get; set; }
    public string? Bio { get; set; }
    public string? Image { get; set; }
    public ICollection<PhotoResponse> Photos { get; set; }
}
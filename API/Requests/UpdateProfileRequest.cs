namespace API.Requests;

public class UpdateProfileRequest
{
    public required string DisplayName { get; set; }
    public string? Bio { get; set; }
}
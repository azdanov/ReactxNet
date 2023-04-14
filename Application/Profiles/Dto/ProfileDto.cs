using Domain;

namespace Application.Profiles.Dto;

public class ProfileDto
{
    public string Username { get; set; } = default!;
    public string DisplayName { get; set; } = default!;
    public string? Bio { get; set; }
    public string? Image { get; set; }
    public ICollection<Photo> Photos { get; set; } = new List<Photo>();
}
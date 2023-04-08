using Microsoft.AspNetCore.Identity;

namespace Domain;

public class User : IdentityUser
{
    public string DisplayName { get; set; } = default!;
    public override string UserName { get; set; } = default!;
    public override string Email { get; set; } = default!;
    public string? Bio { get; set; }
}
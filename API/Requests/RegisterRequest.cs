using System.ComponentModel.DataAnnotations;

namespace API.Requests;

public record RegisterRequest(
    [Required] [EmailAddress] string Email,
    [Required]
    [RegularExpression(@"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$",
        ErrorMessage =
            "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number")]
    string Password,
    [Required] string DisplayName,
    [Required] string Username,
    string? Bio
);
using System.ComponentModel.DataAnnotations;

namespace API.Responses;

public record UserResponse(
    [Required] string Username,
    [Required] string DisplayName,
    [Required] string Token,
    [Required] string? Image
);
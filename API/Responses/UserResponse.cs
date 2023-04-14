using System.ComponentModel.DataAnnotations;

namespace API.Responses;

public class UserResponse
{
    [Required] public required string Username { get; init; }
    [Required] public required string DisplayName { get; init; }
    [Required] public required string Token { get; init; }
    public string? Image { get; init; }
}
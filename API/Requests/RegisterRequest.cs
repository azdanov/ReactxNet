using System.ComponentModel.DataAnnotations;

namespace API.Requests;

public class RegisterRequest
{
    [Required] public required string Email { get; init; }
    [Required] public required string Password { get; init; }
    [Required] public required string DisplayName { get; init; }
    [Required] public required string Username { get; init; }
    [Required] public required string Bio { get; init; }
}
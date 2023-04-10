using System.ComponentModel.DataAnnotations;

namespace API.Requests;

public class LoginRequest
{
    [Required] public required string Email { get; init; }
    [Required] public required string Password { get; init; }
}
using System.ComponentModel.DataAnnotations;

namespace API.Requests;

public record LoginRequest(
    [Required] [EmailAddress] string Email,
    [Required] string Password
);
using System.ComponentModel.DataAnnotations;

namespace API.Responses;

public class AttendeeResponse
{
    [Required] public required string DisplayName { get; init; }
    [Required] public required string Username { get; init; }
    [Required] public string? Bio { get; init; }
    public string? Image { get; init; }
}
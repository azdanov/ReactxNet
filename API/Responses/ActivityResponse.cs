using System.ComponentModel.DataAnnotations;

namespace API.Responses;

public class ActivityResponse
{
    [Required] public required Guid Id { get; init; }
    [Required] public required string Title { get; init; }
    [Required] public required DateTime Date { get; init; }
    [Required] public required string Description { get; init; }
    [Required] public required string Category { get; init; }
    [Required] public required string City { get; init; }
    [Required] public required string Venue { get; init; }
    [Required] public required bool IsCancelled { get; init; }
    public string? HostUsername { get; init; }
    [Required] public ICollection<AttendeeResponse> Attendees { get; init; } = new List<AttendeeResponse>();
}
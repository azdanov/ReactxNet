using System.ComponentModel.DataAnnotations;

namespace API.Requests;

public class CreateActivityRequest
{
    [Required] public required Guid Id { get; init; }
    [Required] public required string Title { get; init; }
    [Required] public required DateTime Date { get; init; }
    [Required] public required string Description { get; init; }
    [Required] public required string Category { get; init; }
    [Required] public required string City { get; init; }
    [Required] public required string Venue { get; init; }
}
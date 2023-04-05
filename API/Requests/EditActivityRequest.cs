using System.ComponentModel.DataAnnotations;

namespace API.Requests;

public class EditActivityRequest
{
    [Required] public Guid? Id { get; init; }
    [Required] public string? Title { get; init; }
    [Required] public DateTime? Date { get; init; }
    [Required] public string? Description { get; init; }
    [Required] public string? Category { get; init; }
    [Required] public string? City { get; init; }
    [Required] public string? Venue { get; init; }
}
using System.ComponentModel.DataAnnotations;

namespace API.Responses;

public class PhotoResponse
{
    [Required] public required string Id { get; init; }
    [Required] public required string Url { get; init; }
    [Required] public required bool IsMain { get; init; }
}
using System.ComponentModel.DataAnnotations;

namespace API.Responses;

public record ActivityResponse(
    [Required] Guid Id,
    [Required] string Title,
    [Required] DateTime Date,
    [Required] string Description,
    [Required] string Category,
    [Required] string City,
    [Required] string Venue
);
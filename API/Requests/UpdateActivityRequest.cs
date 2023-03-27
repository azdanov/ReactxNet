using System.ComponentModel.DataAnnotations;

namespace API.Requests;

public record UpdateActivityRequest(
    [Required] Guid Id,
    [Required] string Title,
    [Required] DateTime Date,
    [Required] string Description,
    [Required] string Category,
    [Required] string City,
    [Required] string Venue
);
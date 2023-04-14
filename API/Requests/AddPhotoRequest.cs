using System.ComponentModel.DataAnnotations;

namespace API.Requests;

public class AddPhotoRequest
{
    [Required] public required IFormFile File { get; init; }
}
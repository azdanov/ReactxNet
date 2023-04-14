namespace Application.Photos.Dto;

public class PhotoDto
{
    public required string Id { get; init; }
    public required string Url { get; init; }
    public required bool IsMain { get; init; }
}
namespace Application.Dtos;

public record ActivityDto(
    Guid Id,
    string? Title,
    DateTime Date,
    string? Description,
    string? Category,
    string? City,
    string? Venue
);
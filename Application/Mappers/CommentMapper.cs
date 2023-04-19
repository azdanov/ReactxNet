using Application.Comments.Dto;
using Domain;
using Riok.Mapperly.Abstractions;

namespace Application.Mappers;

[Mapper]
internal static partial class CommentMapper
{
    public static CommentDto MapToCommentDto(Comment comment)
    {
        return new CommentDto
        {
            Id = comment.Id,
            Body = comment.Body,
            Username = comment.Author.UserName,
            DisplayName = comment.Author.DisplayName,
            Image = comment.Author.Photos.FirstOrDefault(x => x.IsMain)?.Url,
            CreatedAt = comment.CreatedAt
        };
    }

    public static IQueryable<CommentDto> ProjectToCommentDto(this IQueryable<Comment> commentQuery)
    {
        return commentQuery.Select(comment => new CommentDto
        {
            Id = comment.Id,
            Body = comment.Body,
            Username = comment.Author.UserName,
            DisplayName = comment.Author.DisplayName,
            Image = comment.Author.Photos.FirstOrDefault(x => x.IsMain) == null
                ? null
                : comment.Author.Photos.FirstOrDefault(x => x.IsMain)!.Url,
            CreatedAt = comment.CreatedAt
        });
    }
}
using Application.Comments.Dto;
using Application.Core;
using Mediator;

namespace Application.Comments.Commands;

public record CreateCommentCommand(
    string Body,
    Guid ActivityId
) : ICommand<Result<CommentDto>>;
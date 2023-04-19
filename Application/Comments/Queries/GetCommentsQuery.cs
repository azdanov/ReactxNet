using Application.Comments.Dto;
using Application.Core;
using Mediator;

namespace Application.Comments.Queries;

public record GetCommentsQuery(Guid ActivityId) : IQuery<Result<List<CommentDto>>>;
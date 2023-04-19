using Application.Comments.Dto;
using Application.Comments.Queries;
using Application.Core;
using Application.Mappers;
using Mediator;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments.Handlers;

public class GetCommentsQueryHandler : IQueryHandler<GetCommentsQuery, Result<List<CommentDto>>>
{
    private readonly DataContext _context;

    public GetCommentsQueryHandler(DataContext context)
    {
        _context = context;
    }

    public async ValueTask<Result<List<CommentDto>>> Handle(GetCommentsQuery request,
        CancellationToken cancellationToken)
    {
        var comments = await _context.Comments
            .Where(c => c.Activity.Id == request.ActivityId)
            .OrderByDescending(c => c.CreatedAt)
            .ProjectToCommentDto()
            .ToListAsync(cancellationToken);

        return Result<List<CommentDto>>.Success(comments);
    }
}
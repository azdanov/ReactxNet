using Application.Comments.Commands;
using Application.Comments.Dto;
using Application.Core;
using Application.Interfaces;
using Application.Mappers;
using Domain;
using Mediator;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments.Handlers;

public class CreateCommentCommandHandler : ICommandHandler<CreateCommentCommand, Result<CommentDto>>
{
    private readonly DataContext _context;
    private readonly IUserAccessor _userAccessor;

    public CreateCommentCommandHandler(DataContext context, IUserAccessor userAccessor)
    {
        _context = context;
        _userAccessor = userAccessor;
    }

    public async ValueTask<Result<CommentDto>> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
    {
        var activity = await _context.Activities
            .Include(a => a.Comments)
            .ThenInclude(c => c.Author)
            .ThenInclude(u => u.Photos)
            .FirstOrDefaultAsync(a => a.Id == request.ActivityId, cancellationToken);

        if (activity == null) return Result<CommentDto>.Failure("Activity not found");

        var user = await _context.Users
            .SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUsername(), cancellationToken);

        if (user == null) return Result<CommentDto>.Failure("User not found");

        var comment = new Comment
        {
            Author = user,
            Activity = activity,
            Body = request.Body
        };

        activity.Comments.Add(comment);

        var success = await _context.SaveChangesAsync(cancellationToken) > 0;

        return success
            ? Result<CommentDto>.Success(CommentMapper.MapToCommentDto(comment))
            : Result<CommentDto>.Failure("Failed to add comment");
    }
}
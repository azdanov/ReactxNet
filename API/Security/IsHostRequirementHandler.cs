using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Security;

public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
{
    private readonly DataContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public IsHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _dbContext = dbContext;
    }

    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context,
        IsHostRequirement requirement)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return;

        var inputId = _httpContextAccessor.HttpContext?.Request.RouteValues
            .SingleOrDefault(x => x.Key == "id").Value?.ToString();
        var activityId = inputId != null ? Guid.Parse(inputId) : Guid.Empty;

        var attendee = await _dbContext.ActivityAttendees
            .AsNoTracking()
            .FirstOrDefaultAsync(aa => aa.UserId == userId && aa.ActivityId == activityId);
        if (attendee == null) return;

        if (attendee.IsHost) context.Succeed(requirement);
    }
}
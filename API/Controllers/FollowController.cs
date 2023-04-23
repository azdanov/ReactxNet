using System.Net.Mime;
using Application.Followers.Commands;
using Application.Profiles.Dto;
using Mediator;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/profiles")]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
public class FollowController : ControllerBase
{
    private readonly IMediator _mediator;

    public FollowController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("{username}/followings")]
    public async Task<IActionResult> Follow([FromRoute] string username)
    {
        var result = await _mediator.Send(new ToggleFollowUserCommand(username));

        return result.IsSuccess ? Ok() : NotFound();
    }

    [HttpGet("{username}/followings")]
    public async Task<ActionResult<IEnumerable<ProfileDto>>> GetFollowings([FromRoute] string username,
        [FromQuery] string filter)
    {
        var result = await _mediator.Send(new ListFollowersCommand(filter, username));

        return result.IsSuccess ? Ok(result.Value) : NotFound();
    }
}
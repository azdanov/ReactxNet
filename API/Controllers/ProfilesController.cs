using API.Mappers;
using API.Requests;
using API.Responses;
using Application.Profiles.Queries;
using Mediator;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/profiles")]
public class ProfilesController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProfilesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("{username}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<ProfileResponse>> GetProfile([FromRoute] string username)
    {
        var profile = await _mediator.Send(new GetProfileQuery(username));
        if (!profile.IsSuccess) return NotFound();

        return Ok(ProfileMapper.MapToProfileResponse(profile.Value));
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<ProfileResponse>> UpdateProfile([FromBody] UpdateProfileRequest request)
    {
        var profile = await _mediator.Send(ProfileMapper.MapToUpdateProfileCommand(request));
        if (!profile.IsSuccess) return BadRequest(profile.Error);

        return NoContent();
    }

    [HttpGet("{username}/activities")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetUserActivities([FromRoute] string username, [FromQuery] string filter)
    {
        var result = await _mediator.Send(new GetProfileActivities(username, filter));
        if (!result.IsSuccess) return NotFound();

        return Ok(result.Value.Select(ProfileMapper.MapToUserActivityResponse));
    }
}
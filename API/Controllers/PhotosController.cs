using API.Mappers;
using API.Requests;
using API.Responses;
using Application.Photos.Commands;
using Mediator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/photos")]
public class PhotosController : ControllerBase
{
    private readonly IMediator _mediator;

    public PhotosController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [Authorize]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<PhotoResponse>> Add([FromForm] AddPhotoRequest request)
    {
        var photo = await _mediator.Send(PhotoMapper.MapToAddPhotoCommand(request));
        if (!photo.IsSuccess) return BadRequest(photo.Error);

        return Ok(PhotoMapper.MapToPhotoResponse(photo.Value!));
    }

    [Authorize]
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Delete([FromRoute] string id)
    {
        var result = await _mediator.Send(new DeletePhotoCommand(id));
        if (!result.IsSuccess) return BadRequest(result.Error);

        return NoContent();
    }

    [Authorize]
    [HttpPost("{id}/set-main")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> SetMain([FromRoute] string id)
    {
        var result = await _mediator.Send(new SetMainPhotoCommand(id));
        if (!result.IsSuccess) return BadRequest(result.Error);

        return NoContent();
    }
}
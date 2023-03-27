using System.Net.Mime;
using API.Mappers;
using API.Requests;
using API.Responses;
using Application.Activities;
using Mediator;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
public class ActivitiesController : ControllerBase
{
    private readonly IMediator _mediator;

    public ActivitiesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<ActivityResponse>>> GetActivities(CancellationToken cancellationToken)
    {
        var activityDtos = await _mediator.Send(new List.Query(), cancellationToken);
        return ActivityDtoMapper.MapToActivityResponseList(activityDtos);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ActivityResponse>> GetActivity([FromRoute] Guid id,
        CancellationToken cancellationToken)
    {
        var activity = await _mediator.Send(new Details.Query { Id = id }, cancellationToken);
        if (activity == null)
        {
            return NotFound();
        }

        return ActivityDtoMapper.MapToActivityResponse(activity);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ActivityResponse>> CreateActivity([FromBody] CreateActivityRequest request,
        CancellationToken cancellationToken)
    {
        var activity = ActivityDtoMapper.MapToActivityDto(request);

        await _mediator.Send(new Create.Command { Activity = activity }, cancellationToken);

        return CreatedAtAction(nameof(GetActivity), new { id = activity.Id },
            ActivityDtoMapper.MapToActivityResponse(activity));
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ActivityResponse>> EditActivity([FromRoute] Guid id,
        [FromBody] UpdateActivityRequest request, CancellationToken cancellationToken)
    {
        if (id != request.Id)
        {
            return BadRequest();
        }

        var existingActivity = await _mediator.Send(new Details.Query { Id = id }, cancellationToken);
        if (existingActivity == null)
        {
            return NotFound();
        }

        var activity = ActivityDtoMapper.MapToActivityDto(request);

        await _mediator.Send(new Edit.Command { Activity = activity }, cancellationToken);

        return ActivityDtoMapper.MapToActivityResponse(activity);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteActivity([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        var existingActivity = await _mediator.Send(new Details.Query { Id = id }, cancellationToken);
        if (existingActivity == null)
        {
            return NotFound();
        }

        await _mediator.Send(new Delete.Command { Id = id }, cancellationToken);

        return NoContent();
    }
}
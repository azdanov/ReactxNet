using System.Net.Mime;
using API.Extensions;
using API.Mappers;
using API.Requests;
using API.Responses;
using Application.Activities.Commands;
using Application.Activities.Queries;
using FluentValidation;
using Mediator;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
public class ActivitiesController : ControllerBase
{
    private readonly IValidator<CreateActivityCommand> _createActivityValidator;
    private readonly IValidator<EditActivityCommand> _editActivityValidator;
    private readonly IMediator _mediator;

    public ActivitiesController(IMediator mediator, IValidator<CreateActivityCommand> createActivityValidator,
        IValidator<EditActivityCommand> editActivityValidator)
    {
        _mediator = mediator;
        _createActivityValidator = createActivityValidator;
        _editActivityValidator = editActivityValidator;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<ActivityResponse>>> GetActivities(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetActivitiesQuery(), cancellationToken);

        return ActivityDtoMapper.MapToActivityResponseList(result.Value!);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ActivityResponse>> GetActivity([FromRoute] Guid id,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetActivityQuery(id), cancellationToken);
        if (!result.IsSuccess) return NotFound();

        return ActivityDtoMapper.MapToActivityResponse(result.Value);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> CreateActivity([FromBody] CreateActivityRequest request,
        CancellationToken cancellationToken)
    {
        var createActivityCommand = ActivityDtoMapper.MapToCreateActivityCommand(request);

        var validationResult = await _createActivityValidator.ValidateAsync(createActivityCommand, cancellationToken);
        if (!validationResult.IsValid)
        {
            validationResult.AddToModelState(ModelState);
            return ValidationProblem(ModelState);
        }

        var result = await _mediator.Send(createActivityCommand, cancellationToken);
        if (!result.IsSuccess) return UnprocessableEntity(result.Error);

        return CreatedAtAction(nameof(GetActivity), new { id = createActivityCommand.Id }, null);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<IActionResult> EditActivity([FromRoute] Guid id,
        [FromBody] EditActivityRequest request, CancellationToken cancellationToken)
    {
        if (id != request.Id)
        {
            ModelState.AddModelError(nameof(request.Id), "The Id in the route must match the Id in the request body.");
            return ValidationProblem(ModelState);
        }

        var editActivityCommand = ActivityDtoMapper.MapToEditActivityCommand(request);

        var validationResult = await _editActivityValidator.ValidateAsync(editActivityCommand, cancellationToken);
        if (!validationResult.IsValid)
        {
            validationResult.AddToModelState(ModelState);
            return ValidationProblem(modelStateDictionary: ModelState,
                statusCode: StatusCodes.Status422UnprocessableEntity);
        }

        var result = await _mediator.Send(editActivityCommand, cancellationToken);
        if (!result.IsSuccess) return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteActivity([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new DeleteActivityCommand(id), cancellationToken);
        if (!result.IsSuccess) return NotFound();

        return NoContent();
    }
}
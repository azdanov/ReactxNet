using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ErrorController : ControllerBase
{
    [HttpGet("not-found")]
    public IActionResult GetNotFound()
    {
        return NotFound();
    }

    [HttpGet("bad-request")]
    public IActionResult GetBadRequest()
    {
        return BadRequest("This is a bad request");
    }

    [HttpGet("server-error")]
    public IActionResult GetServerError()
    {
        throw new IOException("This is a server error");
    }

    [HttpGet("unauthorised")]
    public IActionResult GetUnauthorised()
    {
        return Unauthorized();
    }
}
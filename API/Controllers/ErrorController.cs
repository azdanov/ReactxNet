using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ErrorController : ControllerBase
{
    [AllowAnonymous]
    [HttpGet("not-found")]
    public IActionResult GetNotFound()
    {
        return NotFound();
    }

    [AllowAnonymous]
    [HttpGet("bad-request")]
    public IActionResult GetBadRequest()
    {
        return BadRequest("This is a bad request");
    }

    [AllowAnonymous]
    [HttpGet("server-error")]
    public IActionResult GetServerError()
    {
        throw new IOException("This is a server error");
    }

    [AllowAnonymous]
    [HttpGet("unauthorised")]
    public IActionResult GetUnauthorised()
    {
        return Unauthorized();
    }
}
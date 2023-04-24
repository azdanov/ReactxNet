using System.Security.Claims;
using API.Requests;
using API.Responses;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/accounts")]
public class AccountsController : ControllerBase
{
    private readonly ITokenService _tokenService;
    private readonly UserManager<User> _userManager;

    public AccountsController(UserManager<User> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<UserResponse>> Login([FromBody] LoginRequest request)
    {
        var user = await _userManager.Users
            .Include(u => u.Photos)
            .FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user == null) return Unauthorized();

        var matches = await _userManager.CheckPasswordAsync(user, request.Password);
        if (!matches) return Unauthorized();

        return new UserResponse
        {
            Username = user.UserName,
            DisplayName = user.DisplayName,
            Token = _tokenService.CreateToken(user),
            Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url
        };
    }

    [AllowAnonymous]
    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<UserResponse>> Register([FromBody] RegisterRequest request)
    {
        if (await _userManager.Users.AnyAsync(u => u.UserName == request.Username))
        {
            ModelState.AddModelError("DuplicateUserName", $"Username '{request.Username}' is already taken.");
            return ValidationProblem();
        }

        var user = new User
        {
            DisplayName = request.DisplayName,
            Email = request.Email,
            UserName = request.Username,
            Bio = request.Bio
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }

            return ValidationProblem();
        }

        return new UserResponse
        {
            Username = user.UserName,
            DisplayName = user.DisplayName,
            Token = _tokenService.CreateToken(user)
        };
    }

    [HttpGet]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<UserResponse>> GetCurrentUser()
    {
        var email = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value ?? string.Empty;
        var user = await _userManager.Users
            .Include(u => u.Photos)
            .FirstOrDefaultAsync(u => u.Email == email);
        if (user == null) return Unauthorized();

        return new UserResponse
        {
            Username = user.UserName,
            DisplayName = user.DisplayName,
            Token = _tokenService.CreateToken(user),
            Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url
        };
    }
}
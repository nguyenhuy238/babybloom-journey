using BabyFirst.Application.Common.Models;
using BabyFirst.Application.Features.Auth.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BabyFirst.Api.Controllers;

/// <summary>
/// Authentication controller for user registration and login.
/// </summary>
[ApiController]
[Route("api/v1/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Register a new user.
    /// </summary>
    [HttpPost("register")]
    [ProducesResponseType(typeof(ApiResponse<RegisterUserResult>), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register([FromBody] RegisterUserRequest request)
    {
        var command = new RegisterUserCommand(request.Email, request.Password, request.FirstName, request.LastName);
        var result = await _mediator.Send(command);

        if (!result.Success)
        {
            return BadRequest(ApiResponse<RegisterUserResult>.Fail(result.Errors.ToList(), "Registration failed"));
        }

        return CreatedAtAction(nameof(Register), ApiResponse<RegisterUserResult>.Success(result, "User registered successfully", 201));
    }

    /// <summary>
    /// Login with email and password.
    /// </summary>
    [HttpPost("login")]
    [ProducesResponseType(typeof(ApiResponse<LoginResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var command = new LoginCommand(request.Email, request.Password);
        var result = await _mediator.Send(command);

        if (!result.Success)
        {
            return BadRequest(ApiResponse<LoginResult>.Fail(result.Errors.ToList(), "Login failed"));
        }

        var response = new LoginResponse(result.Token!, result.RefreshToken!);
        return Ok(ApiResponse<LoginResponse>.Success(response, "Login successful"));
    }
}

// Request DTOs
public record RegisterUserRequest(string Email, string Password, string FirstName, string LastName);
public record LoginRequest(string Email, string Password);
public record LoginResponse(string Token, string RefreshToken);

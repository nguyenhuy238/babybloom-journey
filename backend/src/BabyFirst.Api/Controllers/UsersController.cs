using BabyFirst.Application.Common.Models;
using BabyFirst.Application.Features.Users.DTOs;
using BabyFirst.Application.Features.Users.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BabyFirst.Api.Controllers;

/// <summary>
/// User profile controller.
/// </summary>
[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly IMediator _mediator;

    public UsersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Get current user profile.
    /// </summary>
    [HttpGet("me")]
    [ProducesResponseType(typeof(ApiResponse<UserDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetCurrentUser()
    {
        var result = await _mediator.Send(new GetCurrentUserQuery());

        if (result == null)
        {
            return NotFound(ApiResponse.Fail("User not found", "USER_NOT_FOUND", 404));
        }

        return Ok(ApiResponse<UserDto>.Success(result));
    }
}

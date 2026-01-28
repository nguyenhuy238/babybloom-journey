using BabyFirst.Application.Common.Models;
using BabyFirst.Application.Features.Babies.Commands;
using BabyFirst.Application.Features.Babies.DTOs;
using BabyFirst.Application.Features.Babies.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BabyFirst.Api.Controllers;

/// <summary>
/// Baby profiles controller.
/// </summary>
[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class BabiesController : ControllerBase
{
    private readonly IMediator _mediator;

    public BabiesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Get all babies for current user.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<List<BabyDto>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetMyBabies()
    {
        var result = await _mediator.Send(new GetMyBabiesQuery());
        return Ok(ApiResponse<List<BabyDto>>.Success(result));
    }

    /// <summary>
    /// Create a new baby profile.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<BabyDto>), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateBaby([FromBody] CreateBabyRequest request)
    {
        var command = new CreateBabyCommand(request.Name, request.DateOfBirth, request.Gender, request.DevelopmentGoals);
        var result = await _mediator.Send(command);

        return CreatedAtAction(nameof(GetMyBabies), ApiResponse<BabyDto>.Success(result, "Baby profile created successfully", 201));
    }
}

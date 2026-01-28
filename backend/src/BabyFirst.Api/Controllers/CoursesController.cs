using BabyFirst.Application.Common.Models;
using BabyFirst.Application.Features.Courses.DTOs;
using BabyFirst.Application.Features.Courses.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BabyFirst.Api.Controllers;

/// <summary>
/// Courses controller for educational content.
/// </summary>
[ApiController]
[Route("api/v1/[controller]")]
public class CoursesController : ControllerBase
{
    private readonly IMediator _mediator;

    public CoursesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Get all published courses, optionally filtered by age.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<List<CourseDto>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCourses([FromQuery] int? ageInMonths = null)
    {
        var result = await _mediator.Send(new GetCoursesQuery(ageInMonths));
        return Ok(ApiResponse<List<CourseDto>>.Success(result));
    }

    /// <summary>
    /// Get course details with lessons.
    /// </summary>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(ApiResponse<CourseDetailDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetCourseById(Guid id)
    {
        var result = await _mediator.Send(new GetCourseByIdQuery(id));

        if (result == null)
        {
            return NotFound(ApiResponse.Fail("Course not found", "COURSE_NOT_FOUND", 404));
        }

        return Ok(ApiResponse<CourseDetailDto>.Success(result));
    }
}

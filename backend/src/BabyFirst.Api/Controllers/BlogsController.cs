using BabyFirst.Application.Common.Models;
using BabyFirst.Application.Features.Blogs.DTOs;
using BabyFirst.Application.Features.Blogs.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BabyFirst.Api.Controllers;

/// <summary>
/// Blogs controller for news and knowledge articles.
/// </summary>
[ApiController]
[Route("api/v1/[controller]")]
public class BlogsController : ControllerBase
{
    private readonly IMediator _mediator;

    public BlogsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Get all published blog posts.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<List<BlogPostDto>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetBlogPosts([FromQuery] string? category = null)
    {
        var result = await _mediator.Send(new GetBlogPostsQuery(category));
        return Ok(ApiResponse<List<BlogPostDto>>.Success(result));
    }
}

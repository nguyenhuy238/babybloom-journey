using BabyFirst.Application.Common.Models;
using BabyFirst.Application.Features.Shop.DTOs;
using BabyFirst.Application.Features.Shop.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BabyFirst.Api.Controllers;

/// <summary>
/// Products controller for shop items.
/// </summary>
[ApiController]
[Route("api/v1/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProductsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Get all products.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<List<ProductDto>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetProducts([FromQuery] string? category = null)
    {
        var result = await _mediator.Send(new GetProductsQuery(category));
        return Ok(ApiResponse<List<ProductDto>>.Success(result));
    }
}

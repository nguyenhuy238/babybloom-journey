using BabyFirst.Application.Common.Interfaces;
using BabyFirst.Application.Features.Shop.DTOs;
using MediatR;

namespace BabyFirst.Application.Features.Shop.Queries;

/// <summary>
/// Query to get all products, optionally filtered by category.
/// </summary>
public record GetProductsQuery(string? Category = null) : IRequest<List<ProductDto>>;

public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, List<ProductDto>>
{
    private readonly IUnitOfWork _unitOfWork;

    public GetProductsQueryHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<List<ProductDto>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
        var products = await _unitOfWork.Products.GetAllAsync(cancellationToken);
        
        var query = products.AsQueryable();
        
        if (!string.IsNullOrEmpty(request.Category) && request.Category != "all")
        {
            query = query.Where(p => p.Category == request.Category);
        }

        return query
            .OrderByDescending(p => p.CreatedAt)
            .Select(p => new ProductDto(
                p.Id,
                p.Name,
                p.Price,
                p.OriginalPrice,
                p.ThumbnailUrl,
                p.Category,
                p.AgeRange,
                p.Description,
                p.StockCount,
                p.Rating,
                p.ReviewCount,
                p.ProductType,
                p.AffiliateUrl,
                p.DevelopmentAreas.ToList()
            )).ToList();
    }
}

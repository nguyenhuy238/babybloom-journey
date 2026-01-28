namespace BabyFirst.Application.Features.Shop.DTOs;

/// <summary>
/// DTO for product response.
/// </summary>
public record ProductDto(
    Guid Id,
    string Name,
    decimal Price,
    decimal? OriginalPrice,
    string ThumbnailUrl,
    string Category,
    string AgeRange,
    string Description,
    int StockCount,
    double Rating,
    int ReviewCount,
    string ProductType,
    string? AffiliateUrl,
    List<string> DevelopmentAreas
);

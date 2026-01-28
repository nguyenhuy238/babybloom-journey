using BabyFirst.Domain.Common;

namespace BabyFirst.Domain.Entities;

/// <summary>
/// Entity representing a product in the shop.
/// </summary>
public class Product : BaseEntity
{
    public string Name { get; private set; } = string.Empty;
    public decimal Price { get; private set; }
    public decimal? OriginalPrice { get; private set; }
    public string ThumbnailUrl { get; private set; } = string.Empty;
    public string Category { get; private set; } = string.Empty;
    public string AgeRange { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public int StockCount { get; private set; }
    public double Rating { get; private set; }
    public int ReviewCount { get; private set; }
    public string ProductType { get; private set; } = "babyfirst"; // affiliate | direct | babyfirst
    public string? AffiliateUrl { get; private set; }
    
    private readonly List<string> _developmentAreas = new();
    public IReadOnlyCollection<string> DevelopmentAreas => _developmentAreas.AsReadOnly();

    private Product() { }

    public Product(string name, decimal price)
    {
        SetName(name);
        SetPrice(price);
    }

    public void SetName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Name cannot be empty.", nameof(name));
        Name = name.Trim();
    }

    public void SetPrice(decimal price)
    {
        if (price < 0)
            throw new ArgumentException("Price cannot be negative.", nameof(price));
        Price = price;
    }

    public void SetOriginalPrice(decimal? price)
    {
        OriginalPrice = price;
    }

    public void SetThumbnailUrl(string url)
    {
        ThumbnailUrl = url ?? string.Empty;
    }

    public void SetCategory(string category)
    {
        Category = category?.Trim() ?? string.Empty;
    }

    public void SetAgeRange(string ageRange)
    {
        AgeRange = ageRange?.Trim() ?? string.Empty;
    }

    public void SetDescription(string description)
    {
        Description = description?.Trim() ?? string.Empty;
    }

    public void SetStockCount(int count)
    {
        StockCount = count;
    }

    public void SetRating(double rating, int count)
    {
        Rating = rating;
        ReviewCount = count;
    }

    public void SetProductType(string type, string? affiliateUrl = null)
    {
        ProductType = type ?? "babyfirst";
        AffiliateUrl = affiliateUrl;
    }

    public void AddDevelopmentArea(string area)
    {
        if (!string.IsNullOrWhiteSpace(area) && !_developmentAreas.Contains(area))
        {
            _developmentAreas.Add(area.Trim());
        }
    }
}

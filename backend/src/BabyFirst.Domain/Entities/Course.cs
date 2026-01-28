using BabyFirst.Domain.Common;

namespace BabyFirst.Domain.Entities;

/// <summary>
/// Course entity representing a learning course.
/// </summary>
public class Course : BaseEntity
{
    public string Title { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public string? Subtitle { get; private set; }
    public string? Price { get; private set; }
    public string? Duration { get; private set; }
    public string? ThumbnailUrl { get; private set; }
    public int MinAgeMonths { get; private set; }
    public int MaxAgeMonths { get; private set; }
    public bool IsPublished { get; private set; }
    public int DisplayOrder { get; private set; }

    // Navigation
    private readonly List<Lesson> _lessons = new();
    public IReadOnlyCollection<Lesson> Lessons => _lessons.AsReadOnly();

    private readonly List<string> _features = new();
    public IReadOnlyCollection<string> Features => _features.AsReadOnly();

    private Course() { }

    public Course(string title, int minAgeMonths, int maxAgeMonths)
    {
        SetTitle(title);
        SetAgeRange(minAgeMonths, maxAgeMonths);
    }

    public void SetTitle(string title)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("Course title cannot be empty.", nameof(title));
        Title = title.Trim();
    }

    public void SetDescription(string? description)
    {
        Description = description?.Trim();
    }

    public void SetThumbnailUrl(string? url)
    {
        ThumbnailUrl = url;
    }

    public void SetSubtitle(string? subtitle)
    {
        Subtitle = subtitle?.Trim();
    }

    public void SetPrice(string? price)
    {
        Price = price?.Trim();
    }

    public void SetDuration(string? duration)
    {
        Duration = duration?.Trim();
    }

    public void AddFeature(string feature)
    {
        if (!string.IsNullOrWhiteSpace(feature) && !_features.Contains(feature))
        {
            _features.Add(feature.Trim());
        }
    }

    public void SetAgeRange(int minAgeMonths, int maxAgeMonths)
    {
        if (minAgeMonths < 0)
            throw new ArgumentException("Minimum age cannot be negative.", nameof(minAgeMonths));
        if (maxAgeMonths < minAgeMonths)
            throw new ArgumentException("Maximum age must be greater than or equal to minimum age.", nameof(maxAgeMonths));

        MinAgeMonths = minAgeMonths;
        MaxAgeMonths = maxAgeMonths;
    }

    public void Publish()
    {
        IsPublished = true;
    }

    public void Unpublish()
    {
        IsPublished = false;
    }

    public void SetDisplayOrder(int order)
    {
        DisplayOrder = order;
    }

    public void AddLesson(Lesson lesson)
    {
        if (lesson == null) throw new ArgumentNullException(nameof(lesson));
        _lessons.Add(lesson);
    }

    /// <summary>
    /// Check if the course is suitable for a baby of the given age.
    /// </summary>
    public bool IsSuitableForAge(int ageInMonths)
    {
        return ageInMonths >= MinAgeMonths && ageInMonths <= MaxAgeMonths;
    }
}

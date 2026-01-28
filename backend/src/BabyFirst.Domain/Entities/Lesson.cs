using BabyFirst.Domain.Common;
using BabyFirst.Domain.Enums;

namespace BabyFirst.Domain.Entities;

/// <summary>
/// Lesson entity representing individual learning content within a course.
/// </summary>
public class Lesson : BaseEntity
{
    public string Title { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public ContentType ContentType { get; private set; }
    public string? VideoUrl { get; private set; }
    public string? ArticleContent { get; private set; }
    public int DurationMinutes { get; private set; }
    public int DisplayOrder { get; private set; }
    public bool IsPublished { get; private set; }

    // Instructions for parents
    public string? ActivityInstructions { get; private set; }
    public string? RequiredMaterials { get; private set; }

    // Foreign key
    public Guid CourseId { get; private set; }
    public Course? Course { get; private set; }

    private Lesson() { }

    public Lesson(string title, ContentType contentType, Guid courseId)
    {
        SetTitle(title);
        ContentType = contentType;
        CourseId = courseId;
    }

    public void SetTitle(string title)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("Lesson title cannot be empty.", nameof(title));
        Title = title.Trim();
    }

    public void SetDescription(string? description)
    {
        Description = description?.Trim();
    }

    public void SetVideoUrl(string? url)
    {
        VideoUrl = url;
    }

    public void SetArticleContent(string? content)
    {
        ArticleContent = content;
    }

    public void SetDuration(int minutes)
    {
        if (minutes < 0)
            throw new ArgumentException("Duration cannot be negative.", nameof(minutes));
        DurationMinutes = minutes;
    }

    public void SetDisplayOrder(int order)
    {
        DisplayOrder = order;
    }

    public void SetActivityInstructions(string? instructions)
    {
        ActivityInstructions = instructions?.Trim();
    }

    public void SetRequiredMaterials(string? materials)
    {
        RequiredMaterials = materials?.Trim();
    }

    public void Publish()
    {
        IsPublished = true;
    }

    public void Unpublish()
    {
        IsPublished = false;
    }
}

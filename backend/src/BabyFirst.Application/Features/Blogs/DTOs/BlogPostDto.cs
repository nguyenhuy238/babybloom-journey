namespace BabyFirst.Application.Features.Blogs.DTOs;

/// <summary>
/// DTO for blog post response.
/// </summary>
public record BlogPostDto(
    Guid Id,
    string Title,
    string Content,
    string Excerpt,
    string Category,
    string ReadTime,
    string AuthorName,
    string AuthorAvatar,
    string ThumbnailUrl,
    DateTime PublishedAt
);

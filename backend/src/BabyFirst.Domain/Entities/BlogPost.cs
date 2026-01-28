using BabyFirst.Domain.Common;

namespace BabyFirst.Domain.Entities;

/// <summary>
/// Entity representing a blog post or news article.
/// </summary>
public class BlogPost : BaseEntity
{
    public string Title { get; private set; } = string.Empty;
    public string Content { get; private set; } = string.Empty;
    public string Excerpt { get; private set; } = string.Empty;
    public string Category { get; private set; } = string.Empty;
    public string ReadTime { get; private set; } = string.Empty;
    public string AuthorName { get; private set; } = string.Empty;
    public string AuthorAvatar { get; private set; } = string.Empty;
    public string ThumbnailUrl { get; private set; } = string.Empty;
    public bool IsPublished { get; private set; }

    private BlogPost() { }

    public BlogPost(string title, string content, string authorName)
    {
        SetTitle(title);
        SetContent(content);
        SetAuthor(authorName);
    }

    public void SetTitle(string title)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("Title cannot be empty.", nameof(title));
        Title = title.Trim();
    }

    public void SetContent(string content)
    {
        if (string.IsNullOrWhiteSpace(content))
            throw new ArgumentException("Content cannot be empty.", nameof(content));
        Content = content;
    }

    public void SetExcerpt(string excerpt)
    {
        Excerpt = excerpt?.Trim() ?? string.Empty;
    }

    public void SetCategory(string category)
    {
        Category = category?.Trim() ?? string.Empty;
    }

    public void SetReadTime(string readTime)
    {
        ReadTime = readTime?.Trim() ?? string.Empty;
    }

    public void SetAuthor(string name, string? avatar = null)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Author name cannot be empty.", nameof(name));
        AuthorName = name.Trim();
        AuthorAvatar = avatar ?? string.Empty;
    }

    public void SetThumbnailUrl(string url)
    {
        ThumbnailUrl = url ?? string.Empty;
    }

    public void Publish() => IsPublished = true;
    public void Unpublish() => IsPublished = false;
}

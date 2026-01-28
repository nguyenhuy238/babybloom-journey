using BabyFirst.Application.Common.Interfaces;
using BabyFirst.Application.Features.Blogs.DTOs;
using MediatR;

namespace BabyFirst.Application.Features.Blogs.Queries;

/// <summary>
/// Query to get all published blog posts.
/// </summary>
public record GetBlogPostsQuery(string? Category = null) : IRequest<List<BlogPostDto>>;

public class GetBlogPostsQueryHandler : IRequestHandler<GetBlogPostsQuery, List<BlogPostDto>>
{
    private readonly IUnitOfWork _unitOfWork;

    public GetBlogPostsQueryHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<List<BlogPostDto>> Handle(GetBlogPostsQuery request, CancellationToken cancellationToken)
    {
        // For simplicity using repo directly if available, otherwise using context via UoW if it exposes it
        // Since I don't have a specific blog repo yet, I'll assume I'll add it or use base repository if possible
        // Let's check IUnitOfWork
        
        var posts = await _unitOfWork.BlogPosts.GetAllAsync(cancellationToken);
        
        var query = posts.AsQueryable();
        
        if (!string.IsNullOrEmpty(request.Category) && request.Category != "all")
        {
            query = query.Where(p => p.Category == request.Category);
        }

        return query
            .Where(p => p.IsPublished)
            .OrderByDescending(p => p.CreatedAt)
            .Select(p => new BlogPostDto(
                p.Id,
                p.Title,
                p.Content,
                p.Excerpt,
                p.Category,
                p.ReadTime,
                p.AuthorName,
                p.AuthorAvatar,
                p.ThumbnailUrl,
                p.CreatedAt
            )).ToList();
    }
}

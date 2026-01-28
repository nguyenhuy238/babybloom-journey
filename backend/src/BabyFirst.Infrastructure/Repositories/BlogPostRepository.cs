using BabyFirst.Application.Common.Interfaces;
using BabyFirst.Domain.Entities;
using BabyFirst.Infrastructure.Data;

namespace BabyFirst.Infrastructure.Repositories;

/// <summary>
/// Repository implementation for blog posts.
/// </summary>
public class BlogPostRepository : Repository<BlogPost>, IBlogPostRepository
{
    public BlogPostRepository(ApplicationDbContext context) : base(context)
    {
    }
}

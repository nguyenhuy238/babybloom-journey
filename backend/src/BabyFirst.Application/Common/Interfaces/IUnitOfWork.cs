namespace BabyFirst.Application.Common.Interfaces;

/// <summary>
/// Unit of Work pattern interface for transaction management.
/// </summary>
public interface IUnitOfWork : IDisposable
{
    IUserRepository Users { get; }
    IBabyRepository Babies { get; }
    ICourseRepository Courses { get; }
    IProgressRepository Progress { get; }
    IBlogPostRepository BlogPosts { get; }
    IProductRepository Products { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}

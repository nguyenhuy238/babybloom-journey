using BabyFirst.Application.Common.Interfaces;
using BabyFirst.Infrastructure.Data;

namespace BabyFirst.Infrastructure.Repositories;

/// <summary>
/// Unit of Work implementation for managing repositories and transactions.
/// </summary>
public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    private IUserRepository? _users;
    private IBabyRepository? _babies;
    private ICourseRepository? _courses;
    private IProgressRepository? _progress;
    private IBlogPostRepository? _blogPosts;
    private IProductRepository? _products;

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
    }

    public IUserRepository Users => _users ??= new UserRepository(_context);
    public IBabyRepository Babies => _babies ??= new BabyRepository(_context);
    public ICourseRepository Courses => _courses ??= new CourseRepository(_context);
    public IProgressRepository Progress => _progress ??= new ProgressRepository(_context);
    public IBlogPostRepository BlogPosts => _blogPosts ??= new BlogPostRepository(_context);
    public IProductRepository Products => _products ??= new ProductRepository(_context);

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.SaveChangesAsync(cancellationToken);
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}

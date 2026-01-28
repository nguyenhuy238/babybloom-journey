using BabyFirst.Domain.Entities;

namespace BabyFirst.Application.Common.Interfaces;

/// <summary>
/// Repository interface for User entity with additional query methods.
/// </summary>
public interface IUserRepository : IRepository<User>
{
    Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default);
    Task<bool> ExistsAsync(string email, CancellationToken cancellationToken = default);
}

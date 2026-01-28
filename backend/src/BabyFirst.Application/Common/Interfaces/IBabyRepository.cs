using BabyFirst.Domain.Entities;

namespace BabyFirst.Application.Common.Interfaces;

/// <summary>
/// Repository interface for Baby entity.
/// </summary>
public interface IBabyRepository : IRepository<Baby>
{
    Task<IReadOnlyList<Baby>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
}

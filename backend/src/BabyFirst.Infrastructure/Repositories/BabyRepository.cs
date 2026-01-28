using BabyFirst.Application.Common.Interfaces;
using BabyFirst.Domain.Entities;
using BabyFirst.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BabyFirst.Infrastructure.Repositories;

public class BabyRepository : Repository<Baby>, IBabyRepository
{
    public BabyRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Baby>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(b => b.UserId == userId)
            .OrderBy(b => b.Name)
            .ToListAsync(cancellationToken);
    }
}

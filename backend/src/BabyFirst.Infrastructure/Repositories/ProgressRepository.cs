using BabyFirst.Application.Common.Interfaces;
using BabyFirst.Domain.Entities;
using BabyFirst.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BabyFirst.Infrastructure.Repositories;

public class ProgressRepository : Repository<Progress>, IProgressRepository
{
    public ProgressRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Progress>> GetByBabyIdAsync(Guid babyId, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(p => p.BabyId == babyId)
            .Include(p => p.Lesson)
            .ToListAsync(cancellationToken);
    }

    public async Task<Progress?> GetByBabyAndLessonAsync(Guid babyId, Guid lessonId, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .FirstOrDefaultAsync(p => p.BabyId == babyId && p.LessonId == lessonId, cancellationToken);
    }
}

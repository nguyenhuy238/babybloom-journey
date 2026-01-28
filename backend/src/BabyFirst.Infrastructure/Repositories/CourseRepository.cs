using BabyFirst.Application.Common.Interfaces;
using BabyFirst.Domain.Entities;
using BabyFirst.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BabyFirst.Infrastructure.Repositories;

public class CourseRepository : Repository<Course>, ICourseRepository
{
    public CourseRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyList<Course>> GetPublishedCoursesAsync(CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(c => c.IsPublished)
            .Include(c => c.Lessons.Where(l => l.IsPublished))
            .OrderBy(c => c.DisplayOrder)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Course>> GetCoursesForAgeAsync(int ageInMonths, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(c => c.IsPublished && c.MinAgeMonths <= ageInMonths && c.MaxAgeMonths >= ageInMonths)
            .Include(c => c.Lessons.Where(l => l.IsPublished))
            .OrderBy(c => c.DisplayOrder)
            .ToListAsync(cancellationToken);
    }

    public async Task<Course?> GetWithLessonsAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Include(c => c.Lessons)
            .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);
    }
}

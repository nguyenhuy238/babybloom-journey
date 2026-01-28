using BabyFirst.Domain.Entities;

namespace BabyFirst.Application.Common.Interfaces;

/// <summary>
/// Repository interface for Course entity.
/// </summary>
public interface ICourseRepository : IRepository<Course>
{
    Task<IReadOnlyList<Course>> GetPublishedCoursesAsync(CancellationToken cancellationToken = default);
    Task<IReadOnlyList<Course>> GetCoursesForAgeAsync(int ageInMonths, CancellationToken cancellationToken = default);
    Task<Course?> GetWithLessonsAsync(Guid id, CancellationToken cancellationToken = default);
}

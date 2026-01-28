using BabyFirst.Domain.Entities;

namespace BabyFirst.Application.Common.Interfaces;

/// <summary>
/// Repository interface for Progress entity.
/// </summary>
public interface IProgressRepository : IRepository<Progress>
{
    Task<IReadOnlyList<Progress>> GetByBabyIdAsync(Guid babyId, CancellationToken cancellationToken = default);
    Task<Progress?> GetByBabyAndLessonAsync(Guid babyId, Guid lessonId, CancellationToken cancellationToken = default);
}

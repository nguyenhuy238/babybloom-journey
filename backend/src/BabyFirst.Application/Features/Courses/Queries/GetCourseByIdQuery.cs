using BabyFirst.Application.Common.Interfaces;
using BabyFirst.Application.Features.Courses.DTOs;
using MediatR;

namespace BabyFirst.Application.Features.Courses.Queries;

/// <summary>
/// Query to get course details with lessons.
/// </summary>
public record GetCourseByIdQuery(Guid CourseId) : IRequest<CourseDetailDto?>;

public class GetCourseByIdQueryHandler : IRequestHandler<GetCourseByIdQuery, CourseDetailDto?>
{
    private readonly IUnitOfWork _unitOfWork;

    public GetCourseByIdQueryHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<CourseDetailDto?> Handle(GetCourseByIdQuery request, CancellationToken cancellationToken)
    {
        var course = await _unitOfWork.Courses.GetWithLessonsAsync(request.CourseId, cancellationToken);

        if (course == null)
            return null;

        var lessons = course.Lessons
            .OrderBy(l => l.DisplayOrder)
            .Select(l => new LessonDto(
                l.Id,
                l.Title,
                l.Description,
                l.ContentType,
                l.VideoUrl,
                l.DurationMinutes,
                l.DisplayOrder,
                l.IsPublished,
                l.ActivityInstructions,
                l.RequiredMaterials
            )).ToList();

        return new CourseDetailDto(
            course.Id,
            course.Title,
            course.Description,
            course.Subtitle,
            course.Price,
            course.Duration,
            course.ThumbnailUrl,
            course.MinAgeMonths,
            course.MaxAgeMonths,
            course.IsPublished,
            course.Features.ToList(),
            lessons
        );
    }
}

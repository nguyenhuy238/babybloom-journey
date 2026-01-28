using BabyFirst.Application.Common.Interfaces;
using BabyFirst.Application.Features.Courses.DTOs;
using MediatR;

namespace BabyFirst.Application.Features.Courses.Queries;

/// <summary>
/// Query to get all published courses.
/// </summary>
public record GetCoursesQuery(int? AgeInMonths = null) : IRequest<List<CourseDto>>;

public class GetCoursesQueryHandler : IRequestHandler<GetCoursesQuery, List<CourseDto>>
{
    private readonly IUnitOfWork _unitOfWork;

    public GetCoursesQueryHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<List<CourseDto>> Handle(GetCoursesQuery request, CancellationToken cancellationToken)
    {
        var courses = request.AgeInMonths.HasValue
            ? await _unitOfWork.Courses.GetCoursesForAgeAsync(request.AgeInMonths.Value, cancellationToken)
            : await _unitOfWork.Courses.GetPublishedCoursesAsync(cancellationToken);

        return courses.Select(c => new CourseDto(
            c.Id,
            c.Title,
            c.Description,
            c.Subtitle,
            c.Price,
            c.Duration,
            c.ThumbnailUrl,
            c.MinAgeMonths,
            c.MaxAgeMonths,
            c.IsPublished,
            c.DisplayOrder,
            c.Lessons.Count,
            c.Features.ToList()
        )).ToList();
    }
}

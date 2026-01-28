using BabyFirst.Domain.Enums;

namespace BabyFirst.Application.Features.Courses.DTOs;

/// <summary>
/// DTO for course response.
/// </summary>
public record CourseDto(
    Guid Id,
    string Title,
    string? Description,
    string? Subtitle,
    string? Price,
    string? Duration,
    string? ThumbnailUrl,
    int MinAgeMonths,
    int MaxAgeMonths,
    bool IsPublished,
    int DisplayOrder,
    int LessonCount,
    List<string> Features
);

/// <summary>
/// DTO for lesson response.
/// </summary>
public record LessonDto(
    Guid Id,
    string Title,
    string? Description,
    ContentType ContentType,
    string? VideoUrl,
    int DurationMinutes,
    int DisplayOrder,
    bool IsPublished,
    string? ActivityInstructions,
    string? RequiredMaterials
);

/// <summary>
/// DTO for course with lessons.
/// </summary>
public record CourseDetailDto(
    Guid Id,
    string Title,
    string? Description,
    string? Subtitle,
    string? Price,
    string? Duration,
    string? ThumbnailUrl,
    int MinAgeMonths,
    int MaxAgeMonths,
    bool IsPublished,
    List<string> Features,
    List<LessonDto> Lessons
);

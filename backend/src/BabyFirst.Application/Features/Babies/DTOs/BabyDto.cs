namespace BabyFirst.Application.Features.Babies.DTOs;

/// <summary>
/// DTO for baby profile response.
/// </summary>
public record BabyDto(
    Guid Id,
    string Name,
    DateTime DateOfBirth,
    int AgeInMonths,
    string? Gender,
    string? AvatarUrl,
    string? DevelopmentGoals,
    DateTime CreatedAt
);

/// <summary>
/// DTO for creating a baby profile.
/// </summary>
public record CreateBabyRequest(
    string Name,
    DateTime DateOfBirth,
    string? Gender,
    string? DevelopmentGoals
);

/// <summary>
/// DTO for updating a baby profile.
/// </summary>
public record UpdateBabyRequest(
    string Name,
    string? Gender,
    string? DevelopmentGoals
);

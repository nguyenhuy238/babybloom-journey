using BabyFirst.Domain.Enums;

namespace BabyFirst.Application.Features.Users.DTOs;

/// <summary>
/// DTO for user response.
/// </summary>
public record UserDto(
    Guid Id,
    string FirstName,
    string LastName,
    string Email,
    UserRole Role,
    bool IsActive,
    string? PhoneNumber,
    string? AvatarUrl,
    DateTime CreatedAt
);

namespace BabyFirst.Application.Common.Interfaces;

/// <summary>
/// Interface for getting current user context.
/// </summary>
public interface ICurrentUserService
{
    string? UserId { get; }
    string? Email { get; }
    bool IsAuthenticated { get; }
}

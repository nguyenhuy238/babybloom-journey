namespace BabyFirst.Application.Common.Interfaces;

/// <summary>
/// Interface for Identity/Authentication service.
/// This abstracts the ASP.NET Identity implementation.
/// </summary>
public interface IIdentityService
{
    Task<(bool Success, string UserId, string[] Errors)> RegisterUserAsync(string email, string password);
    Task<(bool Success, string Token, string RefreshToken, string[] Errors)> LoginAsync(string email, string password);
    Task<(bool Success, string Token, string RefreshToken, string[] Errors)> RefreshTokenAsync(string refreshToken);
    Task<bool> ValidateTokenAsync(string token);
    Task<string?> GetUserIdFromTokenAsync(string token);
    Task<bool> ChangePasswordAsync(string userId, string currentPassword, string newPassword);
    Task<bool> DeleteUserAsync(string userId);
}

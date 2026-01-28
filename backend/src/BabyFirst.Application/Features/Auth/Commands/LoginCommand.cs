using MediatR;

namespace BabyFirst.Application.Features.Auth.Commands;

/// <summary>
/// Command to login a user.
/// </summary>
public record LoginCommand(
    string Email,
    string Password
) : IRequest<LoginResult>;

public record LoginResult(
    bool Success,
    string? Token,
    string? RefreshToken,
    string[] Errors
);

using MediatR;

namespace BabyFirst.Application.Features.Auth.Commands;

/// <summary>
/// Command to register a new user.
/// </summary>
public record RegisterUserCommand(
    string Email,
    string Password,
    string FirstName,
    string LastName
) : IRequest<RegisterUserResult>;

public record RegisterUserResult(
    bool Success,
    string? UserId,
    string[] Errors
);

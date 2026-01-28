using BabyFirst.Application.Common.Interfaces;
using MediatR;

namespace BabyFirst.Application.Features.Auth.Commands;

/// <summary>
/// Handler for LoginCommand.
/// </summary>
public class LoginCommandHandler : IRequestHandler<LoginCommand, LoginResult>
{
    private readonly IIdentityService _identityService;

    public LoginCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<LoginResult> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var (success, token, refreshToken, errors) = await _identityService.LoginAsync(request.Email, request.Password);

        return new LoginResult(success, token, refreshToken, errors);
    }
}

using BabyFirst.Application.Common.Interfaces;
using BabyFirst.Domain.Entities;
using BabyFirst.Domain.Enums;
using MediatR;

namespace BabyFirst.Application.Features.Auth.Commands;

/// <summary>
/// Handler for RegisterUserCommand.
/// Creates both Identity user and domain User entity.
/// </summary>
public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, RegisterUserResult>
{
    private readonly IIdentityService _identityService;
    private readonly IUnitOfWork _unitOfWork;

    public RegisterUserCommandHandler(IIdentityService identityService, IUnitOfWork unitOfWork)
    {
        _identityService = identityService;
        _unitOfWork = unitOfWork;
    }

    public async Task<RegisterUserResult> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        // Check if user already exists
        if (await _unitOfWork.Users.ExistsAsync(request.Email, cancellationToken))
        {
            return new RegisterUserResult(false, null, new[] { "A user with this email already exists." });
        }

        // Create Identity user
        var (success, identityUserId, errors) = await _identityService.RegisterUserAsync(request.Email, request.Password);

        if (!success)
        {
            return new RegisterUserResult(false, null, errors);
        }

        // Create domain user
        var user = new User(request.FirstName, request.LastName, request.Email, UserRole.Parent);

        await _unitOfWork.Users.AddAsync(user, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return new RegisterUserResult(true, user.Id.ToString(), Array.Empty<string>());
    }
}

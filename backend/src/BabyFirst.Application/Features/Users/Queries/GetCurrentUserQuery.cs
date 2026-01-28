using BabyFirst.Application.Common.Interfaces;
using BabyFirst.Application.Features.Users.DTOs;
using MediatR;

namespace BabyFirst.Application.Features.Users.Queries;

/// <summary>
/// Query to get current user profile.
/// </summary>
public record GetCurrentUserQuery : IRequest<UserDto?>;

public class GetCurrentUserQueryHandler : IRequestHandler<GetCurrentUserQuery, UserDto?>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public GetCurrentUserQueryHandler(IUnitOfWork unitOfWork, ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<UserDto?> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(_currentUserService.Email))
            return null;

        var user = await _unitOfWork.Users.GetByEmailAsync(_currentUserService.Email, cancellationToken);

        if (user == null)
            return null;

        return new UserDto(
            user.Id,
            user.FirstName,
            user.LastName,
            user.Email,
            user.Role,
            user.IsActive,
            user.PhoneNumber,
            user.AvatarUrl,
            user.CreatedAt
        );
    }
}

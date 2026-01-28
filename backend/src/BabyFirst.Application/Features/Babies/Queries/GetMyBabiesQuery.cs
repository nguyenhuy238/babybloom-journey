using BabyFirst.Application.Common.Interfaces;
using BabyFirst.Application.Features.Babies.DTOs;
using MediatR;

namespace BabyFirst.Application.Features.Babies.Queries;

/// <summary>
/// Query to get babies for current user.
/// </summary>
public record GetMyBabiesQuery : IRequest<List<BabyDto>>;

public class GetMyBabiesQueryHandler : IRequestHandler<GetMyBabiesQuery, List<BabyDto>>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public GetMyBabiesQueryHandler(IUnitOfWork unitOfWork, ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<List<BabyDto>> Handle(GetMyBabiesQuery request, CancellationToken cancellationToken)
    {
        var user = await _unitOfWork.Users.GetByEmailAsync(_currentUserService.Email!, cancellationToken);
        if (user == null)
            return new List<BabyDto>();

        var babies = await _unitOfWork.Babies.GetByUserIdAsync(user.Id, cancellationToken);

        return babies.Select(b => new BabyDto(
            b.Id,
            b.Name,
            b.DateOfBirth,
            b.AgeInMonths,
            b.Gender,
            b.AvatarUrl,
            b.DevelopmentGoals,
            b.CreatedAt
        )).ToList();
    }
}

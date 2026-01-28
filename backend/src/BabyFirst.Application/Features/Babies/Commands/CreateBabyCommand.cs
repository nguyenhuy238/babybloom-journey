using BabyFirst.Application.Common.Interfaces;
using BabyFirst.Application.Features.Babies.DTOs;
using BabyFirst.Domain.Entities;
using MediatR;

namespace BabyFirst.Application.Features.Babies.Commands;

/// <summary>
/// Command to create a baby profile.
/// </summary>
public record CreateBabyCommand(
    string Name,
    DateTime DateOfBirth,
    string? Gender,
    string? DevelopmentGoals
) : IRequest<BabyDto>;

public class CreateBabyCommandHandler : IRequestHandler<CreateBabyCommand, BabyDto>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public CreateBabyCommandHandler(IUnitOfWork unitOfWork, ICurrentUserService currentUserService)
    {
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<BabyDto> Handle(CreateBabyCommand request, CancellationToken cancellationToken)
    {
        var user = await _unitOfWork.Users.GetByEmailAsync(_currentUserService.Email!, cancellationToken)
            ?? throw new UnauthorizedAccessException("User not found");

        var baby = new Baby(request.Name, request.DateOfBirth, user.Id);
        baby.SetGender(request.Gender);
        baby.SetDevelopmentGoals(request.DevelopmentGoals);

        await _unitOfWork.Babies.AddAsync(baby, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return new BabyDto(
            baby.Id,
            baby.Name,
            baby.DateOfBirth,
            baby.AgeInMonths,
            baby.Gender,
            baby.AvatarUrl,
            baby.DevelopmentGoals,
            baby.CreatedAt
        );
    }
}

using BabyFirst.Domain.Common;

namespace BabyFirst.Domain.Entities;

/// <summary>
/// Baby profile entity linked to a parent user.
/// </summary>
public class Baby : BaseEntity
{
    public string Name { get; private set; } = string.Empty;
    public DateTime DateOfBirth { get; private set; }
    public string? Gender { get; private set; }
    public string? AvatarUrl { get; private set; }
    public string? DevelopmentGoals { get; private set; }

    // Foreign key
    public Guid UserId { get; private set; }
    public User? User { get; private set; }

    // Navigation
    private readonly List<Progress> _progressRecords = new();
    public IReadOnlyCollection<Progress> ProgressRecords => _progressRecords.AsReadOnly();

    private Baby() { }

    public Baby(string name, DateTime dateOfBirth, Guid userId)
    {
        SetName(name);
        SetDateOfBirth(dateOfBirth);
        UserId = userId;
    }

    public void SetName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Baby name cannot be empty.", nameof(name));
        Name = name.Trim();
    }

    public void SetDateOfBirth(DateTime dateOfBirth)
    {
        if (dateOfBirth > DateTime.UtcNow)
            throw new ArgumentException("Date of birth cannot be in the future.", nameof(dateOfBirth));
        DateOfBirth = dateOfBirth;
    }

    public void SetGender(string? gender)
    {
        Gender = gender?.Trim();
    }

    public void SetAvatarUrl(string? avatarUrl)
    {
        AvatarUrl = avatarUrl;
    }

    public void SetDevelopmentGoals(string? goals)
    {
        DevelopmentGoals = goals?.Trim();
    }

    /// <summary>
    /// Calculate the baby's age in months.
    /// </summary>
    public int AgeInMonths
    {
        get
        {
            var today = DateTime.UtcNow;
            int months = (today.Year - DateOfBirth.Year) * 12 + today.Month - DateOfBirth.Month;
            if (today.Day < DateOfBirth.Day)
                months--;
            return Math.Max(0, months);
        }
    }
}

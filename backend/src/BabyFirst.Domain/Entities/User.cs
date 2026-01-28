using BabyFirst.Domain.Common;
using BabyFirst.Domain.Enums;

namespace BabyFirst.Domain.Entities;

/// <summary>
/// User entity representing a system user (Parent, Expert, Admin).
/// Note: Authentication data is handled separately by ASP.NET Identity.
/// </summary>
public class User : BaseEntity
{
    public string FirstName { get; private set; } = string.Empty;
    public string LastName { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public UserRole Role { get; private set; } = UserRole.Parent;
    public bool IsActive { get; private set; } = true;
    public string? PhoneNumber { get; private set; }
    public string? AvatarUrl { get; private set; }

    // Navigation properties
    private readonly List<Baby> _babies = new();
    public IReadOnlyCollection<Baby> Babies => _babies.AsReadOnly();

    // Private constructor for EF Core
    private User() { }

    public User(string firstName, string lastName, string email, UserRole role = UserRole.Parent)
    {
        SetName(firstName, lastName);
        SetEmail(email);
        Role = role;
    }

    public void SetName(string firstName, string lastName)
    {
        if (string.IsNullOrWhiteSpace(firstName))
            throw new ArgumentException("First name cannot be empty.", nameof(firstName));
        if (string.IsNullOrWhiteSpace(lastName))
            throw new ArgumentException("Last name cannot be empty.", nameof(lastName));

        FirstName = firstName.Trim();
        LastName = lastName.Trim();
    }

    public void SetEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            throw new ArgumentException("Email cannot be empty.", nameof(email));

        Email = email.Trim().ToLowerInvariant();
    }

    public void SetPhoneNumber(string? phoneNumber)
    {
        PhoneNumber = phoneNumber?.Trim();
    }

    public void SetAvatarUrl(string? avatarUrl)
    {
        AvatarUrl = avatarUrl;
    }

    public void Deactivate()
    {
        IsActive = false;
    }

    public void Activate()
    {
        IsActive = true;
    }

    public void AddBaby(Baby baby)
    {
        if (baby == null) throw new ArgumentNullException(nameof(baby));
        _babies.Add(baby);
    }

    public string FullName => $"{FirstName} {LastName}";
}

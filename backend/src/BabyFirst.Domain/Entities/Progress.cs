using BabyFirst.Domain.Common;
using BabyFirst.Domain.Enums;

namespace BabyFirst.Domain.Entities;

/// <summary>
/// Progress entity tracking a baby's learning progress on lessons.
/// </summary>
public class Progress : BaseEntity
{
    public Guid BabyId { get; private set; }
    public Baby? Baby { get; private set; }

    public Guid LessonId { get; private set; }
    public Lesson? Lesson { get; private set; }

    public ProgressStatus Status { get; private set; } = ProgressStatus.NotStarted;
    public int CompletionPercentage { get; private set; }
    public DateTime? StartedAt { get; private set; }
    public DateTime? CompletedAt { get; private set; }
    public int TimeSpentMinutes { get; private set; }
    public int? QuizScore { get; private set; }
    public string? Notes { get; private set; }

    private Progress() { }

    public Progress(Guid babyId, Guid lessonId)
    {
        BabyId = babyId;
        LessonId = lessonId;
    }

    public void Start()
    {
        if (Status == ProgressStatus.NotStarted)
        {
            Status = ProgressStatus.InProgress;
            StartedAt = DateTime.UtcNow;
        }
    }

    public void UpdateProgress(int percentage)
    {
        if (percentage < 0 || percentage > 100)
            throw new ArgumentException("Completion percentage must be between 0 and 100.", nameof(percentage));

        CompletionPercentage = percentage;

        if (percentage == 100)
        {
            Complete();
        }
        else if (Status == ProgressStatus.NotStarted)
        {
            Start();
        }
    }

    public void Complete()
    {
        Status = ProgressStatus.Completed;
        CompletionPercentage = 100;
        CompletedAt = DateTime.UtcNow;
    }

    public void AddTimeSpent(int minutes)
    {
        if (minutes < 0)
            throw new ArgumentException("Time spent cannot be negative.", nameof(minutes));
        TimeSpentMinutes += minutes;
    }

    public void SetQuizScore(int score)
    {
        if (score < 0 || score > 100)
            throw new ArgumentException("Quiz score must be between 0 and 100.", nameof(score));
        QuizScore = score;
    }

    public void SetNotes(string? notes)
    {
        Notes = notes?.Trim();
    }
}

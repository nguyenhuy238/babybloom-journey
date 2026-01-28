namespace BabyFirst.Application.Common.Models;

/// <summary>
/// Standard API response wrapper.
/// </summary>
public class ApiResponse<T>
{
    public int StatusCode { get; set; }
    public string Message { get; set; } = string.Empty;
    public T? Data { get; set; }
    public string? ErrorCode { get; set; }
    public List<string> Errors { get; set; } = new();

    public static ApiResponse<T> Success(T data, string message = "Success", int statusCode = 200)
    {
        return new ApiResponse<T>
        {
            StatusCode = statusCode,
            Message = message,
            Data = data
        };
    }

    public static ApiResponse<T> Fail(string message, string? errorCode = null, int statusCode = 400)
    {
        return new ApiResponse<T>
        {
            StatusCode = statusCode,
            Message = message,
            ErrorCode = errorCode
        };
    }

    public static ApiResponse<T> Fail(List<string> errors, string message = "Validation failed", int statusCode = 400)
    {
        return new ApiResponse<T>
        {
            StatusCode = statusCode,
            Message = message,
            Errors = errors
        };
    }
}

/// <summary>
/// Non-generic version for responses without data.
/// </summary>
public class ApiResponse : ApiResponse<object>
{
    public static ApiResponse Success(string message = "Success", int statusCode = 200)
    {
        return new ApiResponse
        {
            StatusCode = statusCode,
            Message = message
        };
    }

    public new static ApiResponse Fail(string message, string? errorCode = null, int statusCode = 400)
    {
        return new ApiResponse
        {
            StatusCode = statusCode,
            Message = message,
            ErrorCode = errorCode
        };
    }
}

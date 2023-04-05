using System.Diagnostics.CodeAnalysis;

namespace Application.Core;

public class Result<T>
{
    [MemberNotNullWhen(true, nameof(Value))]
    [MemberNotNullWhen(false, nameof(Error))]
    public bool IsSuccess { get; private init; }

    public T? Value { get; private init; }
    public string? Error { get; private init; }

    public static Result<T> Success(T value)
    {
        return new() { Value = value, IsSuccess = true };
    }

    public static Result<T> Failure(string error)
    {
        return new() { Error = error, IsSuccess = false };
    }
}
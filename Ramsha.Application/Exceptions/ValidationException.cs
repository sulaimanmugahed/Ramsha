using FluentValidation.Results;


namespace Ramsha.Application.Exceptions;

public class ValidationException : Exception
{
    public ValidationException(IEnumerable<ValidationFailure> failures)
        : base("One or more validation failures have occurred.")
    {
        Errors = failures.ToList();
    }
    public List<ValidationFailure> Errors { get; }

}


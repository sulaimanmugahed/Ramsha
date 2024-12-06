using FluentValidation;
using Ramsha.Application.Helpers;


namespace Ramsha.Application.DTOs.Account.Requests
{
    public class ChangePasswordRequest
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
    public class ChangePasswordRequestValidator : AbstractValidator<ChangePasswordRequest>
    {
        public ChangePasswordRequestValidator()
        {
            RuleFor(x => x.CurrentPassword)
                .NotEmpty().NotNull()
                .MinimumLength(6)
                .Matches(Regexs.Password)
                .WithName("NewPassword");
        }
    }

}

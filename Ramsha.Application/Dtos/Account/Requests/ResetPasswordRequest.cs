

namespace Ramsha.Application.Dtos.Account.Requests;

public record ResetPasswordRequest(
string Token,
string NewPassword
);

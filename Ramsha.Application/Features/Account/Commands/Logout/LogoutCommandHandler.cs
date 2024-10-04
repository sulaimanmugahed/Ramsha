
using Ramsha.Application.Constants;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Identity;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Account.Commands.Logout;

public class LogoutCommandHandler(
    IAccountServices accountServices,
    ICookieService cookieService
) : IRequestHandler<LogoutCommand, BaseResult>
{
    public async Task<BaseResult> Handle(LogoutCommand request, CancellationToken cancellationToken)
    {
        var token = cookieService.GetCookieValue(ApplicationCookies.RefreshToken);
        if (token is null)
            return new Error(ErrorCode.ErrorInIdentity, "empty cookie");

        var result = await accountServices.Revoke(token);

		if (result.Success)
			cookieService.RemoveCookie(ApplicationCookies.RefreshToken);

        await accountServices.LogoutCurrentUser();

        return BaseResult.Ok();
    }
}

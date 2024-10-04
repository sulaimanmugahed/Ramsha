using Ramsha.Application.Constants;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Identity;
using Ramsha.Application.Wrappers;
using MediatR;


namespace Ramsha.Application.Features.Account.Commands.RevokeToken;
public class RevokeCommandHandler(
	IAccountServices accountServices,
	ICookieService cookieService)
	: IRequestHandler<RevokeCommand, BaseResult>
{
	public async Task<BaseResult> Handle(RevokeCommand request, CancellationToken cancellationToken)
	{
		var token = cookieService.GetCookieValue(ApplicationCookies.RefreshToken);
		if (token is null)
			return new Error(ErrorCode.ErrorInIdentity, "no refresh token in cookie");
		var result = await accountServices.Revoke(token);

		if (result.Success)
			cookieService.RemoveCookie(ApplicationCookies.RefreshToken);

		return result;
	}
}

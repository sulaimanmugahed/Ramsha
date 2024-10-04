using Ramsha.Application.Constants;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Identity;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.DTOs.Account.Responses;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Constants;
using Ramsha.Domain.Customers.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;


namespace Ramsha.Application.Features.Account.Commands.RefreshToken;
internal class RefreshCommandHandler(
	IBasketRepository basketRepository,
	IAccountServices accountServices,
	ICookieService cookieService)
	: IRequestHandler<RefreshCommand, BaseResult<AuthenticatedUserDto?>>
{
	public async Task<BaseResult<AuthenticatedUserDto?>> Handle(RefreshCommand request, CancellationToken cancellationToken)
	{
		var refreshToken = cookieService.GetCookieValue(ApplicationCookies.RefreshToken);
		if (refreshToken is null)
			return new Error(ErrorCode.ErrorInIdentity, "no refresh token found in the cookie");



		var result = await accountServices.Refresh(refreshToken);
		if (!result.Success)
			return result.Errors;

		if (!string.IsNullOrEmpty(result.Data?.RefreshToken))
		{
			cookieService.SetCookieValue(ApplicationCookies.RefreshToken,
				result.Data.RefreshToken,
				new()
				{
					HttpOnly = true,
					Expires = result.Data.RefreshTokenExpiration.ToLocalTime(),
					SameSite = SameSiteMode.Lax,
					Secure = true,
				});
		}

		return result.Data.Role switch
		{
			Roles.Customer => result.Data.AsAuthCustomerDto(await GetCustomerBasket(result.Data.Username)),
			_ => result.Data.AsAuthUserDto()
		};

	}

	private async Task<Basket?> GetCustomerBasket(string username)
	{
		return await basketRepository.FindByBuyer(username);
	}
}

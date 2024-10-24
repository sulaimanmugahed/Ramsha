using Ramsha.Application.Constants;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Identity;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Account.Responses;
using Ramsha.Application.DTOs.Account.Responses;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Constants;
using Ramsha.Domain.Customers.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Net.Http;


namespace Ramsha.Application.Features.Account.Commands.Login;
internal class LoginCommandHandler(
	IAccountServices accountServices,
	IAuthenticatedUserService authenticatedUserService,
	IBasketRepository basketRepository,
	ICookieService cookieService,
	IUnitOfWork unitOfWork)
	: IRequestHandler<LoginCommand, BaseResult<AuthenticatedUserDto?>>
{
	public async Task<BaseResult<AuthenticatedUserDto?>> Handle(LoginCommand request, CancellationToken cancellationToken)
	{
		var result = await accountServices.Authenticate(
			new() { UserName = request.Username, Password = request.Password });

		if (!result.Success)
		{
			return result.Errors;
		}

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


		return result.Data!.Role switch
		{
			Roles.Customer => result.Data.AsAuthCustomerDto(await GetAndHandleCustomerBasket(result.Data.Username)),
			_ => result.Data.AsAuthUserDto()
		};

	}

	private async Task<Basket?> GetAndHandleCustomerBasket(string username)
	{
		var authCustomerBasket = await basketRepository.FindByBuyer(username);

		var anonCustomer = cookieService.GetCookieValue(ApplicationCookies.Buyer);
		var anonCustomerBasket = await basketRepository.FindByBuyer(anonCustomer);

		if (anonCustomerBasket is not null)
		{
			if (authCustomerBasket is not null)
			{
				basketRepository.Delete(authCustomerBasket);
			}
			anonCustomerBasket.Buyer = username;
			cookieService.RemoveCookie(ApplicationCookies.Buyer);

			await unitOfWork.SaveChangesAsync();
		}

		return anonCustomerBasket ?? authCustomerBasket;
	}
}

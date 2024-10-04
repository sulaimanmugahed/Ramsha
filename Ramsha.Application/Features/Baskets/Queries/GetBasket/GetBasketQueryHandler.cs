using Ramsha.Application.Constants;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Baskets;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.Features.Baskets.Queries.GetBasket;
public class GetBasketQueryHandler(
	IAuthenticatedUserService authenticatedUser,
	ICookieService cookieService,
	IBasketRepository basketRepository) : IRequestHandler<GetBasketQuery, BaseResult<BasketDto>>
{
	public async Task<BaseResult<BasketDto>> Handle(GetBasketQuery request, CancellationToken cancellationToken)
	{
		var buyer = authenticatedUser.UserName ?? cookieService.GetCookieValue(ApplicationCookies.Buyer);

		if(buyer is null)
		{
			cookieService.RemoveCookie(ApplicationCookies.Buyer);
			return new Error(ErrorCode.NotFound);
		}

		var basket = await basketRepository.FindByBuyer(buyer);

		if(basket is null) 
			return new Error(ErrorCode.NotFound);

		return basket.ToDto();
	}
}

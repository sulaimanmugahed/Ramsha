using Ramsha.Application.Constants;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Baskets;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Customers.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.Features.Baskets.Commands.Create;
public class CreateBasketCommandHandler(
	ICookieService cookieService,
	IAuthenticatedUserService authenticatedUser,
	IBasketRepository basketRepository,
	IUnitOfWork unitOfWork) 
	: IRequestHandler<CreateBasketCommand, BaseResult<BasketDto>>
{
	public async Task<BaseResult<BasketDto>> Handle(CreateBasketCommand request, CancellationToken cancellationToken)
	{
		var buyer = authenticatedUser.UserName;
		if (string.IsNullOrEmpty(buyer))
		{
			buyer = Guid.NewGuid().ToString();
			cookieService.SetCookieValue(
				ApplicationCookies.Buyer,
				buyer,
				new()
				{
					IsEssential = true,
					Expires = DateTime.UtcNow.AddDays(30)
				});
		}

		var basket = Basket.Create(buyer);

		_ = await basketRepository.AddAsync(basket);
		await unitOfWork.SaveChangesAsync();

		return basket.ToDto();
	}
}

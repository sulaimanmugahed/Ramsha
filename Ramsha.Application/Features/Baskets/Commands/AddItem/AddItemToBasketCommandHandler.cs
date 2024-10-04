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

namespace Ramsha.Application.Features.Baskets.Commands.AddItem;
internal class AddItemToBasketCommandHandler(
	IInventoryItemRepository inventoryItemRepository,
	IBasketRepository basketRepository,
	IUnitOfWork unitOfWork,
	IAuthenticatedUserService authenticatedUser,
	ICookieService cookieService)
	: IRequestHandler<AddItemToBasketCommand, BaseResult<BasketDto>>
{
	public async Task<BaseResult<BasketDto>> Handle(AddItemToBasketCommand request, CancellationToken cancellationToken)
	{
		var inventoryItem = await inventoryItemRepository.GetWithDetails(
			x => x.ProductId == new Domain.Products.ProductId(request.ProductId) &&
			 x.InventorySKU == request.InventorySku);

		if (inventoryItem is null)
			return new Error(ErrorCode.NotFound);

		var buyer = authenticatedUser.UserName ?? cookieService.GetCookieValue(ApplicationCookies.Buyer);

		var basket = await basketRepository.FindByBuyer(buyer);

		if (basket is null)
		{
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
			var newBasket = Basket.Create(buyer);
			await basketRepository.AddAsync(newBasket);
			await unitOfWork.SaveChangesAsync();
			basket = newBasket;
		}

		basket.AddItem(inventoryItem, request.Quantity);
		await unitOfWork.SaveChangesAsync();

		return basket.ToDto();
	}
}

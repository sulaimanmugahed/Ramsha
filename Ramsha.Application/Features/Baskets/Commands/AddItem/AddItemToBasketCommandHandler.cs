using Ramsha.Application.Constants;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Baskets;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Customers.Entities;
using MediatR;
using System.Security.Cryptography.X509Certificates;

namespace Ramsha.Application.Features.Baskets.Commands.AddItem;
internal class AddItemToBasketCommandHandler(
	IInventoryItemRepository inventoryItemRepository,
	IBasketRepository basketRepository,
	IUnitOfWork unitOfWork,
	IAuthenticatedUserService authenticatedUser,
	ICookieService cookieService)
	: IRequestHandler<AddItemToBasketCommand, BaseResult<BasketItemDto>>
{
	public async Task<BaseResult<BasketItemDto>> Handle(AddItemToBasketCommand request, CancellationToken cancellationToken)
	{
		var inventoryItem = await inventoryItemRepository
		.GetAsync(x => x.Id == new Domain.Inventory.InventoryItemId(request.InventoryItemId));

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

		var basketItem = basket.AddItem(inventoryItem, request.Quantity);
		await unitOfWork.SaveChangesAsync();

		return basketItem.AsItemDto();
	}
}

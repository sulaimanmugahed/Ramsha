using Ramsha.Application.Constants;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using MediatR;


namespace Ramsha.Application.Features.Baskets.Commands.RemoveItem;
public class RemoveItemCommandHandler(
	IUnitOfWork unitOfWork,
	IBasketRepository basketRepository,
	ICookieService cookieService,
	IAuthenticatedUserService authenticatedUser
	): IRequestHandler<RemoveItemCommand, BaseResult>
{
	public async Task<BaseResult> Handle(RemoveItemCommand request, CancellationToken cancellationToken)
	{
		var buyer = authenticatedUser.UserName ?? cookieService.GetCookieValue(ApplicationCookies.Buyer);
		if(buyer is null)
			return new Error(ErrorCode.NotFound, "no buyer");

		var basket = await basketRepository.FindByBuyer(buyer);

		if (basket is null)
			return new Error(ErrorCode.NotFound, "no basket");

		basket.RemoveItem(new Domain.Inventory.InventoryItemId(request.InventoryItemId), request.Quantity);

		await unitOfWork.SaveChangesAsync();

		return BaseResult.Ok();

	}
}

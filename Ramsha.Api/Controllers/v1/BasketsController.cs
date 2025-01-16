using Asp.Versioning;
using Ramsha.Application.Dtos.Baskets;
using Ramsha.Application.Features.Baskets.Commands.AddItem;
using Ramsha.Application.Features.Baskets.Commands.RemoveItem;
using Ramsha.Application.Features.Baskets.Queries.GetBasket;
using Ramsha.Application.Wrappers;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Services;
using Ramsha.Application.Dtos.Common;
using Microsoft.AspNetCore.Authorization;
using Ramsha.Domain.Constants;

namespace Ramsha.Api.Controllers.v1;
/// <summary>
/// Manages basket-related operations.
/// </summary>
[ApiVersion("1.0"), Authorize(Roles = Roles.Customer)]
public class BasketsController(BasketService basketService) : BaseApiController
{
	/// <summary>
	/// Adds an item to the basket
	/// </summary>
	/// <remarks>
	/// This endpoint adds an item to the basket of the currently user. 
	/// If the user does not have an existing basket, a new basket will be created automatically.
	/// The quantity of the item to be added is specified in the request.
	/// </remarks>
	[HttpPost("items")]
	public async Task<BaseResult<BasketItemDto>> AddItemToBasket(AddItemToBasketCommand command)
		=> await Mediator.Send(command);

	/// <summary>
	/// Removes an item from basket.
	/// </summary>
	/// <remarks>
	/// This endpoint removes a specific quantity of an item from the basket of the currently user.
	/// If the provided quantity is greater than or equal to the item's quantity in the basket, the item will be completely removed.
	/// </remarks>
	[HttpDelete("items")]
	public async Task<BaseResult> RemoveItemFromBasket(RemoveItemCommand command)
		=> await Mediator.Send(command);


	/// <summary>
	/// Retrieves the current user's basket.
	/// </summary>
	/// <remarks>
	/// This endpoint returns the basket of the currently user. 
	/// If the user does not have a basket, the result will be null.
	/// </remarks>
	[HttpGet]
	public async Task<BaseResult<BasketDto?>> GetBasket()
		=> await Mediator.Send(new GetBasketQuery());

	/// <summary>
	/// Delete the basket.
	/// </summary>
	/// <remarks>
	/// This endpoint delete the basket of the currently user.
	/// </remarks>
	[HttpDelete]
	public async Task<BaseResult> DeleteBasket()
	{
		await basketService.ClearBasket();
		return BaseResult.Ok();
	}

	/// <summary>
	/// Retrieves basket detail
	/// </summary>
	/// <remarks>
	/// This endpoint provides detailed information about the basket of the currently user.
	/// The details include items in the basket, their quantities, pricing, and any applicable delivery fees.
	/// If the user does not have a basket, the result will be null.
	/// </remarks>
	[HttpGet("detail")]
	public async Task<BaseResult<BasketDetailDto?>> GetDetail()
	{
		return await basketService.GetBasketDeliveryFeeDetail();
	}

}

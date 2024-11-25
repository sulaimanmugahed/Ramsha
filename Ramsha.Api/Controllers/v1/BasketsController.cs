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

[ApiVersion("1.0")]
public class BasketsController(BasketService basketService) : BaseApiController
{

	[HttpPost(nameof(AddItemToBasket))]
	public async Task<BaseResult<BasketItemDto>> AddItemToBasket(AddItemToBasketCommand command)
		=> await Mediator.Send(command);

	[HttpDelete(nameof(RemoveItemFromBasket))]
	public async Task<BaseResult> RemoveItemFromBasket(RemoveItemCommand command)
		=> await Mediator.Send(command);

	[HttpGet, Authorize(Roles = Roles.Customer)]
	public async Task<BaseResult<BasketDto?>> GetBasket()
		=> await Mediator.Send(new GetBasketQuery());

	[HttpDelete, Authorize(Roles = Roles.Customer)]
	public async Task<BaseResult> ClearBasket()
	{
		await basketService.ClearBasket();
		return BaseResult.Ok();
	}


	[HttpGet("detail")]
	public async Task<BaseResult<BasketDetailDto?>> FeeDetail()
	{
		return await basketService.GetBasketDeliveryFeeDetail();
	}

}

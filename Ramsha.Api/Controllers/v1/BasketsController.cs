using Asp.Versioning;
using Ramsha.Application.Dtos.Baskets;
using Ramsha.Application.Features.Baskets.Commands.AddItem;
using Ramsha.Application.Features.Baskets.Commands.RemoveItem;
using Ramsha.Application.Features.Baskets.Queries.GetBasket;
using Ramsha.Application.Wrappers;
using Microsoft.AspNetCore.Mvc;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]
public class BasketsController : BaseApiController
{

	[HttpPost(nameof(AddItemToBasket))]
	public async Task<BaseResult<BasketItemDto>> AddItemToBasket(AddItemToBasketCommand command)
		=> await Mediator.Send(command);

	[HttpDelete(nameof(RemoveItemFromBasket))]
	public async Task<BaseResult> RemoveItemFromBasket(RemoveItemCommand command)
		=> await Mediator.Send(command);

	[HttpGet]
	public async Task<BaseResult<BasketDto>> GetBasket()
		=> await Mediator.Send(new GetBasketQuery());

}

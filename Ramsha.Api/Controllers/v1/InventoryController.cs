
using Asp.Versioning;
using Ramsha.Application.Dtos.Inventory;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Features.Inventory.Commands.ApproveSupplyRequest;
using Ramsha.Application.Features.Inventory.Queries.GetInventoryItems;
using Ramsha.Application.Features.Inventory.Queries.GetSupplyRequestList;
using Ramsha.Application.Wrappers;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Features.Inventory.Commands.ApplyInventoryItemDiscount;
using Ramsha.Application.Features.Inventory.Commands.ChangeStockStrategy;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]

public class InventoryController : BaseApiController
{
    [HttpPost]
    public async Task<BaseResult<List<InventoryItemDto>>> GetInventoryList([FromBody] GetInventoryItemsQuery query)
    => await Mediator.Send(query);

    [HttpPost(nameof(ApproveSupply))]
    public async Task<BaseResult> ApproveSupply(ApproveSupplyCommand command)
    => await Mediator.Send(command);

    [HttpPost("change-stock-strategy")]
    public async Task<BaseResult> ChangeStockStrategy(ChangeStockStrategyCommand command)
    => await Mediator.Send(command);

    [HttpGet(nameof(GetSupplyList))]
    public async Task<BaseResult<List<SupplyDto>>> GetSupplyList(GetSupplyListQuery query)
    => await Mediator.Send(query);

    [HttpPost("discount")]
    public async Task<BaseResult> ApplyInventoryItemDiscount(ApplyInventoryItemDiscountCommand command)
    => await Mediator.Send(command);

}

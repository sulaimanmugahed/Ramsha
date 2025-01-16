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
using Ramsha.Application.Dtos.Supplies;

namespace Ramsha.Api.Controllers.v1;

/// <summary>
/// Manages inventory-related operations.
/// </summary>
[ApiVersion("1.0")]
public class InventoryController : BaseApiController
{
    /// <summary>
    /// Retrieves a paged list of inventory items.
    /// </summary>
    /// <remarks>
    /// This endpoint returns a paginated list of inventory items based on the provided query parameters.
    /// </remarks>
    [HttpPost("paged")]
    public async Task<BaseResult<List<InventoryItemDto>>> GetInventoryPaged([FromBody] GetInventoryItemsQuery query)
        => await Mediator.Send(query);

    /// <summary>
    /// Changes the stock strategy for inventory items.
    /// </summary>
    /// <remarks>
    /// This endpoint updates the stock strategy (e.g., FIFO, LIFO) used for managing inventory items.
    /// </remarks>
    [HttpPost("change-stock-strategy")]
    public async Task<BaseResult> ChangeStockStrategy(ChangeStockStrategyCommand command)
        => await Mediator.Send(command);

    /// <summary>
    /// Applies a discount to a specific inventory item.
    /// </summary>
    /// <remarks>
    /// This endpoint applies a discount to an inventory item identified by its unique ID.
    /// </remarks>
    [HttpPost("{id}/discount")]
    public async Task<BaseResult> ApplyInventoryItemDiscount([FromRoute] Guid id, DiscountRequest discountRequest)
        => await Mediator.Send(new ApplyInventoryItemDiscountCommand { InventoryItemId = id, Discount = discountRequest });
}
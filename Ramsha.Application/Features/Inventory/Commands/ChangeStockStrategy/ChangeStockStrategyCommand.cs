
using MediatR;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Inventory.Enums;

namespace Ramsha.Application.Features.Inventory.Commands.ChangeStockStrategy;

public class ChangeStockStrategyCommand : IRequest<BaseResult>
{
    public StockSelectionType SelectionType { get; set; }
    public Guid InventoryItemId { get; set; }
}


using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Inventory.Commands.ChangeStockStrategy;

public class ChangeStockStrategyCommandHandler(
    IInventoryItemRepository inventoryItemRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<ChangeStockStrategyCommand, BaseResult>
{
    public async Task<BaseResult> Handle(ChangeStockStrategyCommand request, CancellationToken cancellationToken)
    {
        var item = await inventoryItemRepository.GetAsync(x => x.Id == new Domain.Inventory.InventoryItemId(request.InventoryItemId), x => x.Stocks);
        if (item is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no item with this id");

        item.SetStockSelectionType(request.SelectionType);

        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}



using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Features.Inventory.Commands.ApplyInventoryItemDiscount;

public class ApplyInventoryItemDiscountCommandHandler(
    IInventoryItemRepository inventoryItemRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<ApplyInventoryItemDiscountCommand, BaseResult>
{
    public async Task<BaseResult> Handle(ApplyInventoryItemDiscountCommand request, CancellationToken cancellationToken)
    {
        var inventoryItem = await inventoryItemRepository.GetWithStocksDetail(new Domain.Inventory.InventoryItemId(request.InventoryItemId));
        if (inventoryItem is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no item exist");

        var discount = Discount.Create(request.Discount.Value, request.Discount.StartDate, request.Discount.EndDate, request.Discount.Type);
        inventoryItem.ApplyDiscount(discount);

        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}


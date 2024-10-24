

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
        var inventoryItem = await inventoryItemRepository.GetInventoryItemBySku(request.Sku);
        if (inventoryItem is null)
            return new Error(ErrorCode.RequestedDataNotExist);

        var discount = Discount.Create(request.DiscountValue, request.StartData, request.EndData, request.DiscountType);
        //   inventoryItem.AddDiscount(discount);

        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}


using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Suppliers.Enums;
using MediatR;

namespace Ramsha.Application.Features.Inventory.Commands.ApproveSupplyRequest;

public class ApproveSupplyCommandHandler(
    ISupplyRepository supplyRepository,
    IInventoryItemRepository inventoryItemRepository,
    IUnitOfWork unitOfWork,
    ISupplierRepository supplierRepository,
    IProductRepository productRepository
) : IRequestHandler<ApproveSupplyCommand, BaseResult>
{
    public async Task<BaseResult> Handle(ApproveSupplyCommand request, CancellationToken cancellationToken)
    {
        var supply = await supplyRepository.GetWithDetails(x => x.Id == new Domain.Suppliers.SupplyId(request.SupplyId));
        if (supply is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no supply exist");

        if (supply.Items.Count == 0)
            return new Error(ErrorCode.EmptyData, "The request has no item");

        var supplier = await supplierRepository.GetAsync(x => x.Username == supply.Supplier);
        if (supplier is null)
        {
            return new Error(ErrorCode.RequestedDataNotExist, "no supplier exist");
        }

        foreach (var item in supply.Items)
        {
            var product = await productRepository.GetByIdAsync(item.ItemSupplied.ProductId);
            if (product is null)
                return new Error(ErrorCode.EmptyData, "no product found with in the item");

            var price = new Domain.Common.Price(item.WholesalePrice, supply.Currency);

            var inventoryItem = await inventoryItemRepository.GetAsync(x =>
                x.ProductId == item.ItemSupplied.ProductId &&
                x.SupplierId == supplier.Id &&
                x.ProductVariantId == item.ItemSupplied.ProductVariantId,
                x => x.Stocks);

            if (inventoryItem is null)
            {
                inventoryItem = InventoryItem.Create(
                    item.ItemSupplied.ProductId,
                    item.ItemSupplied.ProductVariantId,
                    supplier.Id,
                    item.ItemSupplied.Sku,
                    product.Name
                );
                await inventoryItemRepository.AddAsync(inventoryItem);
            }

            inventoryItem.AddStock(item.Quantity, price);
        }

        supply.SetStatus(SupplyStatus.Approved);
        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}
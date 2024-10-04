
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Products.Entities;
using Ramsha.Domain.Products.Enums;
using Ramsha.Domain.Suppliers.Enums;
using MediatR;

namespace Ramsha.Application.Features.Inventory.Commands.ApproveSupplyRequest;

public class ApproveSupplyCommandHandler(
    ISupplyRepository supplyRepository,
    IProductRepository productRepository,
    IInventoryItemRepository inventoryItemRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<ApproveSupplyCommand, BaseResult>
{
    public async Task<BaseResult> Handle(ApproveSupplyCommand request, CancellationToken cancellationToken)
    {
        var supplyReq = await supplyRepository.GetWithDetails(x => x.Id == new Domain.Suppliers.SupplyId(request.SupplyId));
        if (supplyReq is null)
            return new Error(ErrorCode.NotFound);

        if (supplyReq.Items.Count == 0)
            return new Error(ErrorCode.EmptyData, "The request has no item");



        foreach (var item in supplyReq.Items)
        {
            var product = await productRepository.GetAsync(
                x => x.Id == item.ItemSupplied.ProductId,
                x => x.Variants
            );
            var variant = product?.Variants.FirstOrDefault(x => x.SKU == item.ItemSupplied.SKU);
            if (product is null || variant is null)
                return new Error(ErrorCode.EmptyData, "The request has no item");



            var inventoryItem = await inventoryItemRepository.GetAsync(x =>
            x.ProductId == item.ItemSupplied.ProductId &&
            x.SupplierId == supplyReq.SupplierId &&
            x.ProductVariantId == variant.Id);

            if (inventoryItem is null)
            {
                inventoryItem = InventoryItem.Create(
                               item.ItemSupplied.ProductId,
                               supplyReq.SupplierId,
                               item.ItemSupplied.Name,
                               item.Quantity);

                inventoryItem.SetVariant(variant.Id);
                inventoryItem.SetSKU(item.ItemSupplied.SKU, supplyReq.Supplier.Username);
                inventoryItem.UpdatePrice(item.WholesalePrice, supplyReq.Currency);

                await inventoryItemRepository.AddAsync(inventoryItem);
            }
            else
            {
                inventoryItem.UpdateInventory(item.Quantity, item.WholesalePrice, supplyReq.Currency);
            }
        }

        supplyReq.SetStatus(SupplyStatus.Approved);
        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }






}


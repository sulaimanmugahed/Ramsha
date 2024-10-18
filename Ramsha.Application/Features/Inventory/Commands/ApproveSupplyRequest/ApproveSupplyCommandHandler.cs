
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Products.Enums;
using Ramsha.Domain.Suppliers.Enums;
using MediatR;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Features.Inventory.Commands.ApproveSupplyRequest;

public class ApproveSupplyCommandHandler(
    ISupplyRepository supplyRepository,
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

            var inventoryItem = await inventoryItemRepository.GetAsync(x =>
                x.ProductId == item.ItemSupplied.ProductId &&
                x.Supplier == supplyReq.Supplier &&
                x.ProductVariantId == item.ItemSupplied.ProductVariantId);

            var price = ProductPrice.Create(item.WholesalePrice, supplyReq.Currency, PriceType.Wholesale);

            if (inventoryItem is null)
            {
                inventoryItem = InventoryItem.Create(
                    item.ItemSupplied.ProductId,
                    item.ItemSupplied.ProductVariantId,
                    supplyReq.Supplier,
                    item.ItemSupplied.Name,
                    item.Quantity,
                    price,
                    item.ItemSupplied.Sku
                );

                await inventoryItemRepository.AddAsync(inventoryItem);
            }
            else
            {
                inventoryItem.UpdateInventory(item.Quantity, price);
            }
        }

        supplyReq.SetStatus(SupplyStatus.Approved);
        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}



// using Ramsha.Application.Contracts;
// using Ramsha.Application.Contracts.Persistence;
// using Ramsha.Application.Wrappers;
// using Ramsha.Domain.Inventory.Entities;
// using Ramsha.Domain.Products.Entities;
// using Ramsha.Domain.Products.Enums;
// using Ramsha.Domain.Suppliers.Enums;
// using MediatR;

// namespace Ramsha.Application.Features.Inventory.Commands.ApproveSupplyRequest;

// public class ApproveSupplyCommandHandler(
//     ISupplyRepository supplyRepository,
//     IProductRepository productRepository,
//     IInventoryItemRepository inventoryItemRepository,
//     IUnitOfWork unitOfWork
// ) : IRequestHandler<ApproveSupplyCommand, BaseResult>
// {
//     public async Task<BaseResult> Handle(ApproveSupplyCommand request, CancellationToken cancellationToken)
//     {
//         var supplyReq = await supplyRepository.GetWithDetails(x => x.Id == new Domain.Suppliers.SupplyId(request.SupplyId));
//         if (supplyReq is null)
//             return new Error(ErrorCode.NotFound);

//         if (supplyReq.Items.Count == 0)
//             return new Error(ErrorCode.EmptyData, "The request has no item");



//         foreach (var item in supplyReq.Items)
//         {
//             var product = await productRepository.GetAsync(
//                 x => x.Id == item.ItemSupplied.ProductId,
//                 x => x.Variants
//             );
//             var variant = product?.Variants.FirstOrDefault(x => x.SKU == item.ItemSupplied.SKU);
//             if (product is null || variant is null)
//                 return new Error(ErrorCode.EmptyData, "The request has no item");



//             var inventoryItem = await inventoryItemRepository.GetAsync(x =>
//             x.ProductId == item.ItemSupplied.ProductId &&
//             x.SupplierId == supplyReq.SupplierId &&
//             x.ProductVariantId == variant.Id);

//             var price = ProductPrice.Create(item.WholesalePrice, supplyReq.Currency, PriceType.Wholesale);

//             if (inventoryItem is null)
//             {
//                 inventoryItem = InventoryItem.Create(
//                                item.ItemSupplied.ProductId,
//                                variant.Id,
//                                supplyReq.SupplierId,
//                                item.ItemSupplied.Name,
//                                item.Quantity,
//                                price,
//                                item.ItemSupplied.SKU
//                                );

//                 await inventoryItemRepository.AddAsync(inventoryItem);
//             }
//             else
//             {
//                 inventoryItem.UpdateInventory(item.Quantity, price);
//             }
//         }

//         supplyReq.SetStatus(SupplyStatus.Approved);
//         await unitOfWork.SaveChangesAsync();

//         return BaseResult.Ok();
//     }






// }


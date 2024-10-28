
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Suppliers.Entities;
using MediatR;

namespace Ramsha.Application.Features.Suppliers.Commands.AddSupplyRequestItem;

public class AddSupplyRequestItemCommandHandler(
    ISupplyRequestRepository supplyRequestRepository,
    IProductRepository productRepository,
    ISupplierRepository supplierRepository,
    IAuthenticatedUserService authenticatedUserService,
    ISupplierProductRepository supplierProductRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<AddOrUpdateSupplyRequestItemCommand, BaseResult<SupplyRequestDto>>
{
    public async Task<BaseResult<SupplyRequestDto>> Handle(AddOrUpdateSupplyRequestItemCommand request, CancellationToken cancellationToken)
    {

        var supplier = await supplierRepository.GetAsync(x => x.Username == authenticatedUserService.UserName);
        if (supplier is null)
        {
            return new Error(ErrorCode.ErrorInIdentity);
        }

        var productId = new Domain.Products.ProductId(request.ProductId);
        var variantId = new Domain.Products.ProductVariantId(request.ProductVariantId);

        var supplyRequest = await supplyRequestRepository.GetAsync(
            x => x.Supplier == supplier.Username,
            x => x.Items);

        if (supplyRequest is null)
        {
            supplyRequest = SupplyRequest.Create(supplier.Username);
            await supplyRequestRepository.AddAsync(supplyRequest);
            await unitOfWork.SaveChangesAsync();
        }

        var supplierProduct = await supplierProductRepository.GetAsync(
            x => x.ProductId == productId && x.SupplierId == supplier.Id,
             p => p.SupplierVariants);

        if (supplierProduct is null)
        {
            return new Error(ErrorCode.RequestedDataNotExist, "no supplier product found");
        }


        var variant = supplierProduct.SupplierVariants.First(x => x.ProductVariantId == variantId);
        if (variant is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no variant found");

        var existItem = supplyRequest.Items
        .FirstOrDefault(x => x.ProductVariantId == variantId && x.ProductId.Value == request.ProductId);
        if (existItem is not null)
        {
            existItem.SetQuantity(request.Quantity);
        }
        else
        {
            var supplyRequestItem = SupplyRequestItem.Create(
                productId,
                variantId,
                supplier.Id,
                request.Quantity);

            supplyRequest.AddItem(supplyRequestItem);
        }

        await unitOfWork.SaveChangesAsync();

        return supplyRequest.AsSupplyRequestDto();
    }
}


using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Entities;
using Ramsha.Domain.Suppliers.Entities;
using MediatR;

namespace Ramsha.Application.Features.Suppliers.Commands.AddSupplyRequestItem;

public class AddSupplyRequestItemCommandHandler(
    ISupplyRequestRepository supplyRequestRepository,
    IProductRepository productRepository,
    IAuthenticatedUserService authenticatedUserService,
    IUnitOfWork unitOfWork
) : IRequestHandler<AddSupplyRequestItemCommand, BaseResult<SupplyRequestDto>>
{
    public async Task<BaseResult<SupplyRequestDto>> Handle(AddSupplyRequestItemCommand request, CancellationToken cancellationToken)
    {
        var supplyRequest = await supplyRequestRepository.GetAsync(
            x => x.Supplier == authenticatedUserService.UserName,
            x => x.Items);

        if (supplyRequest is null)
        {
            supplyRequest = SupplyRequest.Create(authenticatedUserService.UserName);
            await supplyRequestRepository.AddAsync(supplyRequest);
            await unitOfWork.SaveChangesAsync();
        }

        var product = await productRepository.GetAsync(x => x.Id == new Domain.Products.ProductId(request.ProductId), p => p.Variants);
        if (product is null)
            return new Error(ErrorCode.EmptyData);

        ProductVariant? variant = null;
        var productVariantId = new Domain.Products.ProductVariantId(request.ProductVariantId);

        if (product.Variants.Count != 0)
        {
            variant = product.Variants.First(x => x.Id == productVariantId);
            if (variant is null)
                return new Error(ErrorCode.EmptyData);
        }
        var existItem = supplyRequest.Items
        .FirstOrDefault(x => x.ProductVariantId == productVariantId && x.ProductId.Value == request.ProductId);
        if (existItem is not null)
        {
            return new Error(ErrorCode.ThisDataAlreadyExist, "The Item is already exist", "variantValues");
        }
        else
        {
            var supplyRequestItem = SupplyRequestItem.Create(
                product.Id,

                variant?.Id,
                request.WholesalePrice,
                request.Quantity);

            supplyRequestItem.SetSKU(variant.SKU);

            supplyRequest.AddItem(supplyRequestItem);
        }

        await unitOfWork.SaveChangesAsync();

        return supplyRequest.AsSupplyRequestDto();
    }
}


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
            x => x.Id == new Domain.Suppliers.SupplyRequestId(request.SupplyRequestId));

        if (supplyRequest is null)
            return new Error(ErrorCode.EmptyData);

        var product = await productRepository.GetAsync(x => x.Id == new Domain.Products.ProductId(request.ProductId), p => p.Variants);
        if (product is null)
            return new Error(ErrorCode.EmptyData);

        ProductVariant? variant = null;
        if (product.Variants.Count != 0)
        {
            variant = product.Variants.First(x => x.SKU == request.SKU);
            if (variant is null)
                return new Error(ErrorCode.EmptyData);
        }

        var existItem = supplyRequest.Items.FirstOrDefault(x => x.SKU == request.SKU);
        if (existItem is not null)
        {
            existItem.IncrementQuantity(request.Quantity);
            existItem.SetWholesalePrice(request.WholesalePrice);
        }
        else
        {
            var supplyRequestItem = SupplyRequestItem.Create(
                product.Id,
                request.WholesalePrice,
                request.Quantity);
            supplyRequestItem.SetSKU(request.SKU);

            supplyRequest.AddItem(supplyRequestItem);
        }

        await unitOfWork.SaveChangesAsync();

        return supplyRequest.AsSupplyRequestDto();
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Commands.DeleteProductVariant;

public class DeleteProductVariantCommandHandler(
    IProductRepository productRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<DeleteProductVariantCommand, BaseResult>
{
    public async Task<BaseResult> Handle(DeleteProductVariantCommand request, CancellationToken cancellationToken)
    {
        var productId = new Domain.Products.ProductId(request.ProductId);
        var product = await productRepository.GetAsync(x => x.Id == productId, x => x.Variants);
        if (product is null)
            return new Error(ErrorCode.RequestedDataNotExist);

        var variant = product.Variants.FirstOrDefault(
            x => x.Id == new Domain.Products.ProductVariantId(request.VariantId)
        );

        if (variant is null)
            return new Error(ErrorCode.RequestedDataNotExist);

        product.Variants.Remove(variant);

        product.Update();
        
        await unitOfWork.SaveChangesAsync();
        return BaseResult.Ok();
    }
}

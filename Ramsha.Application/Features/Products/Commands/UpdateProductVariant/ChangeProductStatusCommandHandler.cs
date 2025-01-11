using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Products.Commands.UpdateProductVariant;

public class ChangeProductStatusCommandHandler(
IProductRepository productRepository,
IUnitOfWork unitOfWork
) : IRequestHandler<ChangeProductStatusCommand, BaseResult>
{
    public async Task<BaseResult> Handle(ChangeProductStatusCommand request, CancellationToken cancellationToken)
    {
        var product = await productRepository.GetByIdAsync(new Domain.Products.ProductId(request.ProductId));
        if (product is null)
            return new Error(ErrorCode.RequestedDataNotExist);

        product.SetStatus(request.Status);
        product.Update();
        
        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}

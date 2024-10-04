using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products;
using MediatR;

namespace Ramsha.Application.Features.Products.Commands.DeleteProductRange;

public class DeleteProductRangeCommandHandler(
    IProductRepository productRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<DeleteProductRangeCommand, BaseResult>
{
    public async Task<BaseResult> Handle(DeleteProductRangeCommand request, CancellationToken cancellationToken)
    {
        var productIds = request.Products
        .Select(p => new ProductId(p))
        .ToList();

        await productRepository.RemoveRange(productIds);
        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}

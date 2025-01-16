using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.BackgroundJobs;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Services;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Products.Commands.DeleteProduct;

public class DeleteProductCommandHandler(
    IProductRepository productRepository,
    IUnitOfWork unitOfWork,
    IBackgroundJobService backgroundJobService
) : IRequestHandler<DeleteProductCommand, BaseResult>
{
    public async Task<BaseResult> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        var product = await productRepository.GetByIdAsync(new Domain.Products.ProductId(request.Id));
        if (product is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no product not found with this id");

        productRepository.Delete(product);
        await unitOfWork.SaveChangesAsync();

        backgroundJobService.StartJob<ProductService>(x => x.InvalidateRelatedCachedData());

        return BaseResult.Ok();

    }
}

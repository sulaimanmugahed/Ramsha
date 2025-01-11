
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using MediatR;
using Ramsha.Application.Contracts.BackgroundJobs;
using Ramsha.Application.Contracts.Caching;
using Ramsha.Application.Services;

namespace Ramsha.Application.Features.Products.Commands.DeleteProductOption;

public class DeleteProductOptionCommandHandler(
    IProductRepository productRepository,
    IUnitOfWork unitOfWork

) : IRequestHandler<DeleteProductOptionCommand, BaseResult>
{
    public async Task<BaseResult> Handle(DeleteProductOptionCommand request, CancellationToken cancellationToken)
    {
        var product = await productRepository.GetProductWithOptions(new Domain.Products.ProductId(request.ProductId));
        if (product is null)
            return new Error(ErrorCode.EmptyData);

        var option = product.Options.FirstOrDefault(o => o.OptionId.Value == request.OptionId);
        if (product is null)
            return new Error(ErrorCode.EmptyData);

        product.Options.Remove(option!);

        product.Update();

        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}

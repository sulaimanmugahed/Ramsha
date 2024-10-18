
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Commands.AddProductOption;

public class AddProductOptionCommandHandler(
    IProductRepository productRepository,
    IUnitOfWork unitOfWork,
    IOptionRepository optionRepository
) : IRequestHandler<AddProductOptionCommand, BaseResult>
{
    public async Task<BaseResult> Handle(AddProductOptionCommand request, CancellationToken cancellationToken)
    {
        var product = await productRepository.GetByIdAsync(new Domain.Products.ProductId(request.ProductId));
        if (product is null)
            return new Error(ErrorCode.EmptyData, nameof(request.ProductId));

        var option = await optionRepository.GetByIdAsync(new Domain.Products.OptionId(request.OptionId));
        if (option is null)
            return new Error(ErrorCode.EmptyData, nameof(request.OptionId));

        product.AddOption(option, request.Priority);
        await unitOfWork.SaveChangesAsync();

        return BaseResult.Ok();
    }
}

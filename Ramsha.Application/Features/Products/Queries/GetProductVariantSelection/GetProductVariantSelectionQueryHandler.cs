
using MediatR;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Products.Queries.GetProductVariantSelection;

public class GetProductVariantSelectionQueryHandler(
    IProductRepository productRepository
) : IRequestHandler<GetProductVariantSelectionQuery, BaseResult<ProductVariantSelectionDto?>>
{
    public async Task<BaseResult<ProductVariantSelectionDto?>> Handle(GetProductVariantSelectionQuery request, CancellationToken cancellationToken)
    {
        return await productRepository.GetProductVariantSelection(new Domain.Products.ProductId(request.ProductId));
    }
}

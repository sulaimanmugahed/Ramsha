
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Queries.GetProductVariants;

public class GetProductVariantsQueryHandler(
    IProductRepository productRepository
) : IRequestHandler<GetProductVariantsQuery, BaseResult<List<ProductVariantDto?>>>
{
    public async Task<BaseResult<List<ProductVariantDto?>>> Handle(GetProductVariantsQuery request, CancellationToken cancellationToken)
    {
        var variants = await productRepository.GetVariants(
            new Domain.Products.ProductId(request.ProductId)
           );

        return variants.Select(v => v?.AsDto()).ToList();
    }
}

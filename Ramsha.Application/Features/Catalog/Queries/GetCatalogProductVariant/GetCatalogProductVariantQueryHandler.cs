
using MediatR;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Catalog.Queries.GetCatalogProductVariant;

public class GetCatalogProductVariantQueryHandler(
    IProductRepository productRepository
) : IRequestHandler<GetCatalogProductVariantQuery, BaseResult<CatalogVariantDto?>>
{
    public async Task<BaseResult<CatalogVariantDto?>> Handle(GetCatalogProductVariantQuery request, CancellationToken cancellationToken)
    {
        return await productRepository.GetCatalogProductVariant(
            new Domain.Products.ProductId(request.ProductId),
            request.ProductVariantId.HasValue ? new Domain.Products.ProductVariantId(request.ProductVariantId.Value) : null
            );
    }
}

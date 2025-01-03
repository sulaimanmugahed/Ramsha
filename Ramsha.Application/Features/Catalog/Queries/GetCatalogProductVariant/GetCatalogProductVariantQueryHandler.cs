
using MediatR;
using Ramsha.Application.Contracts.Caching;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Helpers;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Catalog.Queries.GetCatalogProductVariant;

public class GetCatalogProductVariantQueryHandler(
    IProductRepository productRepository,
    IRedisCacheService redisCacheService
) : IRequestHandler<GetCatalogProductVariantQuery, BaseResult<CatalogVariantDto?>>
{
    public async Task<BaseResult<CatalogVariantDto?>> Handle(GetCatalogProductVariantQuery request, CancellationToken cancellationToken)
    {
        var key = CacheKeysHelper.CatalogCacheKeys.GetCatalogVariantKey(request.ProductId.ToString(), request.ProductVariantId.ToString());
        var catalogVariantDto = await redisCacheService.GetObject<CatalogVariantDto>(key);
        if (catalogVariantDto is null)
        {
            catalogVariantDto = await productRepository.GetCatalogProductVariant(
                        new Domain.Products.ProductId(request.ProductId),
                        request.ProductVariantId.HasValue ? new Domain.Products.ProductVariantId(request.ProductVariantId.Value) : null
                        );

            await redisCacheService.SetObject(key, catalogVariantDto, TimeSpan.FromHours(1));
        }
        return catalogVariantDto;
    }
}


using MediatR;
using Ramsha.Application.Contracts.Caching;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Extensions;
using Ramsha.Application.Helpers;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Catalog.Queries.GetCatalogProductDetail;

public class GetCatalogProductDetailQueryHandler(
    IProductRepository productRepository,
    IRedisCacheService redisCacheService
) : IRequestHandler<GetCatalogProductDetailQuery, BaseResult<CatalogProductDetailDto>>
{
    public async Task<BaseResult<CatalogProductDetailDto>> Handle(GetCatalogProductDetailQuery request, CancellationToken cancellationToken)
    {
        var key = CacheKeysHelper.CatalogCacheKeys.GetProductDetailKey(request.ProductId.ToString());

        var productDto = await redisCacheService.GetObject<CatalogProductDetailDto>(key);
        if (productDto is null)
        {
            productDto = await productRepository.GetProductCatalogDetail(new Domain.Products.ProductId(request.ProductId));
            if (productDto is null)
                return new Error(ErrorCode.RequestedDataNotExist);

            await redisCacheService.SetObject(key, productDto, TimeSpan.FromHours(1));
        }

        return productDto;
    }
}


using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;
using Ramsha.Application.Contracts.Caching;
using Ramsha.Application.Helpers;

namespace Ramsha.Application.Features.Products.Queries.GetProductVariants;

public class GetProductVariantsQueryHandler(
    IProductRepository productRepository,
    ICacheService redisCacheService

) : IRequestHandler<GetProductVariantsQuery, BaseResult<List<ProductVariantDto?>>>
{
    public async Task<BaseResult<List<ProductVariantDto?>>> Handle(GetProductVariantsQuery request, CancellationToken cancellationToken)
    {
        var key = CacheKeysHelper.ProductCacheKeys.GetProductVariantsKey(request.ProductId.ToString());

        var variantDTOs = await redisCacheService.GetObject<List<ProductVariantDto?>>(key);
        if (variantDTOs is null)
        {
            var variants = await productRepository.GetVariants(
                      new Domain.Products.ProductId(request.ProductId)
                     );

            variantDTOs = variants.Select(v => v?.AsDto()).ToList();
            await redisCacheService.SetObject(key, variantDTOs, TimeSpan.FromHours(6));
        }

        return variantDTOs;
    }
}

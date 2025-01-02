
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;
using Ramsha.Application.Contracts.Caching;
using Ramsha.Application.Helpers;

namespace Ramsha.Application.Features.Products.Queries.GetProductVariants;

public class GetProductVariantQueryHandler(
    IProductRepository productRepository,
    IRedisCacheService redisCacheService
) : IRequestHandler<GetProductVariantQuery, BaseResult<ProductVariantDto>>
{
    public async Task<BaseResult<ProductVariantDto>> Handle(GetProductVariantQuery request, CancellationToken cancellationToken)
    {
        var key = CacheKeysHelper.ProductCacheKeys.GetProductVariantKey(request.ProductId.ToString(), request.VariantId.ToString());

        var variantDTO = await redisCacheService.GetObject<ProductVariantDto?>(key);
        if (variantDTO is null)
        {
            var variant = await productRepository.GetVariantDetails(
          new Domain.Products.ProductId(request.ProductId),
          new Domain.Products.ProductVariantId(request.VariantId)
      );
            if (variant is null)
                return new Error(ErrorCode.EmptyData);

            variantDTO = variant.AsDto();
            await redisCacheService.SetObject(key, variantDTO, TimeSpan.FromHours(6));
        }
        return variantDTO;
    }
}

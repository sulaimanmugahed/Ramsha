using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;
using MediatR;
using Ramsha.Application.Contracts.Caching;
using Ramsha.Application.DTOs.Common;
using Ramsha.Application.Helpers;

namespace Ramsha.Application.Features.Products.Queries.GetProductsPaged;

public class GetProductsPagedQueryHandler(
    IProductRepository productRepository,
    IHttpService httpService,
    ICacheService redisCacheService
) : IRequestHandler<GetProductsPagedQuery, BaseResult<List<ProductDto>>>
{
    public async Task<BaseResult<List<ProductDto>>> Handle(GetProductsPagedQuery request, CancellationToken cancellationToken)
    {
        var key = CacheKeysHelper.ProductCacheKeys.GetProductPagedKey(request);
        var result = await redisCacheService.GetObject<PaginationResponseDto<ProductDto>>(key);

        if (result is null)
        {
            result = await productRepository.GetProductsPaged(
               request.PaginationParams,
               request.FilterParams,
               request.SortingParams);

            await redisCacheService.SetObject(key, result, TimeSpan.FromMinutes(10));
        }

        result.AddFilterMetaData(request.FilterParams);

        result.AddSortingMetaData(request.SortingParams);

        httpService.AddPagedHeader(result.MetaData);

        return result.Data;
    }
}

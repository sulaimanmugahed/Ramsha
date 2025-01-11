using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.BackgroundJobs;
using Ramsha.Application.Contracts.Caching;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.DTOs.Common;
using Ramsha.Application.Helpers;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Catalog.Queries.GetCatalogProductsPaged;

public class GetCatalogProductsPagedQueryHandler(
    IProductRepository productRepository,
    IHttpService httpService,
    ICacheService redisCacheService,
    IBackgroundJobService backgroundJobService
) : IRequestHandler<GetCatalogProductsPagedQuery, BaseResult<List<CatalogProductDto>>>
{
    public async Task<BaseResult<List<CatalogProductDto>>> Handle(GetCatalogProductsPagedQuery request, CancellationToken cancellationToken)
    {

        var key = CacheKeysHelper.CatalogCacheKeys.GetProductPagedKey(request);
        var result = await redisCacheService.GetObject<PaginationResponseDto<CatalogProductDto>?>(key);
        if (result is null)
        {
            result = await productRepository.GetCatalogProductsPaged(request, p => p.Status == Domain.Products.Enums.ProductStatus.Active);
            backgroundJobService.Enqueue(() => redisCacheService.SetObject(key, result, TimeSpan.FromMinutes(10)));
        }

        result.AddFilterMetaData(request.FilterParams);
        result.AddSortingMetaData(request.SortingParams);

        httpService.AddPagedHeader(result.MetaData);
        return result.Data;
    }
}


using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Caching;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.DTOs.Common;
using Ramsha.Application.Helpers;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Catalog.Queries.GetCatalogInventoryItems;

public class GetCatalogInventoryItemsQueryHandler(
    IInventoryItemRepository inventoryItemRepository,
    IHttpService httpService,
     IRedisCacheService redisCacheService
) : IRequestHandler<GetCatalogInventoryItemsQuery, BaseResult<List<CatalogInventoryItemDetailDto>>>
{
    public async Task<BaseResult<List<CatalogInventoryItemDetailDto>>> Handle(GetCatalogInventoryItemsQuery request, CancellationToken cancellationToken)
    {
        var key = CacheKeysHelper.CatalogCacheKeys.GetInventoryItemsKey(new PagedParams
        {
            PaginationParams = request.PaginationParams,
            SortingParams = request.SortingParams,
            FilterParams = request.FilterParams,
        },
         request.ProductId.ToString(),
         request.ProductVariantId.ToString());
        var responseDto = await redisCacheService.GetObject<PaginationResponseDto<CatalogInventoryItemDetailDto>>(key);
        if (responseDto is null)
        {
            responseDto = await inventoryItemRepository.GetCatalogItemsPagedListAsync(
                          new Domain.Products.ProductId(request.ProductId),
                          request.PaginationParams,
                          request.SortingParams,
                          request.FilterParams,
                          request.ProductVariantId.HasValue ? new Domain.Products.ProductVariantId(request.ProductVariantId.Value) : null
                          );

            await redisCacheService.SetObject(key, responseDto, TimeSpan.FromMinutes(10));
        }

        responseDto.AddFilterMetaData(request.FilterParams);
        responseDto.AddSortingMetaData(request.SortingParams);

        httpService.AddPagedHeader(responseDto.MetaData);
        return responseDto.Data;
    }
}

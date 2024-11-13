
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Catalog.Queries.GetCatalogInventoryItems;

public class GetCatalogInventoryItemsQueryHandler(
    IInventoryItemRepository inventoryItemRepository,
    IHttpService httpService
) : IRequestHandler<GetCatalogInventoryItemsQuery, BaseResult<List<CatalogInventoryItemDetailDto>>>
{
    public async Task<BaseResult<List<CatalogInventoryItemDetailDto>>> Handle(GetCatalogInventoryItemsQuery request, CancellationToken cancellationToken)
    {
        var responseDto = await inventoryItemRepository.GetCatalogItemsPagedListAsync(
            new Domain.Products.ProductId(request.ProductId),
            request.PaginationParams,
            request.SortingParams,
            request.FilterParams,
            request.ProductVariantId.HasValue ? new Domain.Products.ProductVariantId(request.ProductVariantId.Value) : null
            );

        responseDto.AddFilterMetaData(request.FilterParams);
        responseDto.AddSortingMetaData(request.SortingParams);

        httpService.AddPagedHeader(responseDto.MetaData);
        return responseDto.Data;
    }
}

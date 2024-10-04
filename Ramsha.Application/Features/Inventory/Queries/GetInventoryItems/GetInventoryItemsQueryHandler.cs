
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Inventory;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Inventory.Queries.GetInventoryItems;

public class GetInventoryItemsQueryHandler(
    IInventoryItemRepository inventoryItemRepository,
    IHttpService httpService
) : IRequestHandler<GetInventoryItemsQuery, BaseResult<List<InventoryItemDto>>>
{
    public async Task<BaseResult<List<InventoryItemDto>>> Handle(GetInventoryItemsQuery request, CancellationToken cancellationToken)
    {
        var responseDto = await inventoryItemRepository.GetItemsPagedListAsync(
            request.PaginationParams ?? new(),
            request.SortingParams,
            request.FilterParams);

        responseDto.AddFilterMetaData(request.FilterParams);
        responseDto.AddSortingMetaData(request.SortingParams);

        httpService.AddPagedHeader(responseDto.MetaData);
        return responseDto.Data;
    }
}


using Ramsha.Application.Dtos.Inventory;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Inventory.Queries.GetInventoryItems;

public class GetInventoryItemsQuery : IRequest<BaseResult<List<InventoryItemDto>>>
{
    public PaginationParams? PaginationParams { get; set; }
    public SortingParams? SortingParams { get; set; }
    public FilterParams? FilterParams { get; set; }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Suppliers.Queries.GetSupplierInventoryItems;

public class GetSupplierInventoryItemsQueryHandler(
    IInventoryItemRepository inventoryItemRepository,
    IAuthenticatedUserService authenticatedUserService
) : IRequestHandler<GetSupplierInventoryItemsQuery, BaseResult<List<SupplierInventoryItemDto>>>
{
    public async Task<BaseResult<List<SupplierInventoryItemDto>>> Handle(GetSupplierInventoryItemsQuery request, CancellationToken cancellationToken)
    {
        var inventoryItems = await inventoryItemRepository.GetAllAsync();
        return inventoryItems.Select(x => x.AsSupplierInventoryItemDto()).ToList();
    }
}

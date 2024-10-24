
using MediatR;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Suppliers.Queries.GetSupplierInventoryItems;

public class GetSupplierInventoryItemsQuery : IRequest<BaseResult<List<SupplierInventoryItemDto>>>
{

}

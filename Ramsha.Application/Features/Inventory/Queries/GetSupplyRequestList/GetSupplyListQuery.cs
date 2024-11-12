
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Suppliers.Enums;
using MediatR;
using Ramsha.Application.Dtos.Supplies;

namespace Ramsha.Application.Features.Inventory.Queries.GetSupplyRequestList;

public class GetSupplyListQuery : IRequest<BaseResult<List<SupplyDto>>>
{
    public SupplyStatus Status { get; set; }
}

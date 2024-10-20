
using MediatR;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Suppliers.Queries.GetSupplyRequestItem;

public class GetSupplyRequestItemQuery : IRequest<BaseResult<SupplyRequestItemDto?>>
{
    public Guid SupplyRequestItemId { get; set; }
}

using MediatR;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Suppliers.Commands.RemoveSupplyRequestItem;

public class RemoveSupplyRequestItemCommand : IRequest<BaseResult>
{
    public Guid SupplyRequestItemId { get; set; }
}

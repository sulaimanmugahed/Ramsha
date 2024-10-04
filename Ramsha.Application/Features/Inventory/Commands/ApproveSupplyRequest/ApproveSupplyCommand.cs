
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Inventory.Commands.ApproveSupplyRequest;

public class ApproveSupplyCommand : IRequest<BaseResult>
{
    public Guid SupplyId { get; set; }
}

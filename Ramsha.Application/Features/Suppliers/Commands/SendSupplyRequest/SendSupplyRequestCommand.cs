
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Suppliers.Commands.SendSupplyRequest;

public class SendSupplyRequestCommand : IRequest<BaseResult>
{
    public Guid SupplyRequestId { get; set; }
}

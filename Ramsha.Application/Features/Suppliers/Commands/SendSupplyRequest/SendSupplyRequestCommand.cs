
using Ramsha.Application.Wrappers;
using MediatR;
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Application.Features.Suppliers.Commands.SendSupplyRequest;

public class SendSupplyRequestCommand : IRequest<BaseResult>
{
    public Guid SupplyRequestId { get; set; }
    public Currency Currency { get; set; }
}

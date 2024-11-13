
using Ramsha.Application.Wrappers;
using MediatR;
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Application.Features.Suppliers.Commands.SendSupplyRequest;

public class SendSupplyRequestCommand : IRequest<BaseResult>
{
    public CurrencyCode Currency { get; set; }
}

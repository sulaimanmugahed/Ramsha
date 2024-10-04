
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Orders.Entities;
using MediatR;

namespace Ramsha.Application.Features.Orders.Commands.CreateOrder;

public class CreateOrderCommand : IRequest<BaseResult<string>>
{
    public bool SaveAddress { get; set; }
    public ShippingAddress ShippingAddress { get; set; }
}

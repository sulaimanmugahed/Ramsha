using Ramsha.Domain.Common.Events;
using Ramsha.Domain.Orders.Entities;

namespace Ramsha.Domain.Orders.Events;

public record NewOrderCreatedEvent(
    OrderId OrderId,
    ShippingAddress ShippingAddress,
    List<OrderItem> OrderItems
):IDomainEvent{};



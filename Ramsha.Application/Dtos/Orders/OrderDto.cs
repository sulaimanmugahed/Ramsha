

using Ramsha.Domain.Orders.Entities;

namespace Ramsha.Application.Dtos.Orders;

public record OrderDto(
    decimal Subtotal,
    decimal DeliveryFee,
    decimal Total,
    string OrderStatus,
    List<OrderItemDto> Items,
    ShippingAddress ShippingAddress,
    DateTime OrderDate
);


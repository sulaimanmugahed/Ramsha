

using Ramsha.Domain.Orders.Entities;

namespace Ramsha.Application.Dtos.Orders;

public record OrderDto(
    Guid Id,
    decimal Subtotal,
    decimal DeliveryFee,
    decimal Total,
    string Status,
    DateTime OrderDate
);

public record OrderDetailDto(
    Guid Id,
    decimal Subtotal,
    decimal DeliveryFee,
    decimal Total,
    string Status,
    List<OrderItemDto> Items,
    ShippingAddress ShippingAddress,
    DateTime OrderDate
);


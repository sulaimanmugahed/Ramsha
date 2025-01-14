using Ramsha.Domain.Common;
using Ramsha.Domain.Orders.Entities;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Application.Dtos.Orders;

public record FulfillmentRequestDto(Guid Id, Guid OrderId,Guid? DeliveryAgentId, decimal Subtotal, decimal DeliveryFee, string Status, DateTime Received);
public record FulfillmentRequestItemDto(Guid InventoryItemId, string Name, string ImageUrl, int Quantity, decimal Price, string Sku);
public record FulfillmentRequestDetailDto(
   Guid Id,
   Guid OrderId,
   Guid? DeliveryAgent,
    decimal Subtotal,
    decimal DeliveryFee,
    string Status,
    DateTime Received,
    ShippingAddress ShippingAddress,
    List<OrderItemDto> Items
);

public record SupplierInfoDto(
    Guid Id,
    string Username,
    string Name,
    Address Address
);



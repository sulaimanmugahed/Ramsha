using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Domain.Orders.Entities;

namespace Ramsha.Application.Extensions;

public static class OrdersExtensions
{

    public static FulfillmentRequestDetailDto AsFulfillmentRequestDetailDto(this FulfillmentRequest request)
    => new(request.Id.Value,
    request.OrderId.Value,
    request.DeliveryAgentId?.Value,
    request.Subtotal,
    request.DeliveryFee,
    request.Status.ToString(),
    request.Created,
    request.Order.ShippingAddress,
    request.Items.Select(x => x.AsDto()).ToList())
    ;

    public static FulfillmentRequestDto AsFulfillmentRequestDto(this FulfillmentRequest request)
    => new FulfillmentRequestDto(
        request.Id.Value,
        request.OrderId.Value,
        request.DeliveryAgentId?.Value,
        request.Subtotal,
        request.DeliveryFee,
        request.Status.ToString(),
        request.Created
    );
    public static OrderItemDto AsDto(this OrderItem x)
    => new OrderItemDto(
             x.ItemOrdered.InventoryItemId.Value,
             x.ItemOrdered.Name,
             x.ItemOrdered.InventorySKU,
             x.ItemOrdered.PictureUrl,
             x.Price,
             x.Quantity
             );

    public static OrderDto AsDto(this Order order)
    {
        return new OrderDto(
            order.Id.Value,
         order.Subtotal,
         order.DeliveryFee,
         order.GetTotal(),
         order.OrderStatus.ToString(),
         order.OrderDate
        );
    }

    public static OrderDetailDto AsDetailDto(this Order order)
    {
        return new OrderDetailDto(
         order.Id.Value,
         order.Subtotal,
         order.DeliveryFee,
         order.GetTotal(),
         order.OrderStatus.ToString(),
         order.FulfillmentRequests.Select(x => x.AsFulfillmentRequestDto()).ToList(),
         order.ShippingAddress,
         order.OrderDate
        );
    }
}

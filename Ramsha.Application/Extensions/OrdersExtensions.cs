using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Domain.Orders.Entities;

namespace Ramsha.Application.Extensions;

public static class OrdersExtensions
{
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
         order.OrderItems.Select(x => x.AsDto()).ToList(),
         order.ShippingAddress,
         order.OrderDate
        );
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Domain.Orders.Entities;

namespace Ramsha.Application.Extensions;

public static class OrdersExtensions
{
    public static OrderDto AsDto(this Order order)
    {
        return new OrderDto(
         order.Subtotal,
         order.DeliveryFee,
         order.GetTotal(),
         order.OrderStatus.ToString(),
         order.OrderItems.Select(x =>
          new OrderItemDto(
             x.ItemOrdered.InventoryItemId.Value,
             x.ItemOrdered.Name,
             x.ItemOrdered.InventorySKU,
             x.ItemOrdered.PictureUrl,
             x.Price,
             x.Quantity
             )).ToList(),
         order.ShippingAddress,
         order.OrderDate
        );
    }
}

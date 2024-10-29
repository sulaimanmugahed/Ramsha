
using Ramsha.Domain.Common;
using Ramsha.Domain.Customers;
using Ramsha.Domain.Customers.Entities;

namespace Ramsha.Domain.Orders.Entities;

public class Order : BaseEntity
{

    public Order()
    {

    }

    
    public Order(OrderId id, CustomerId customerId, List<OrderItem> items,ShippingAddress shippingAddress)
    {
        Id = id;
        CustomerId = customerId;
        OrderStatus = OrderStatus.Pending;
        OrderDate = DateTime.UtcNow;
        OrderItems = items;
        Subtotal = items.Sum(x => x.Price * x.Quantity);
        ShippingAddress = shippingAddress;
    }

    public static Order Create(CustomerId customerId, List<OrderItem> items,ShippingAddress shippingAddress, decimal deliveryFee)
    {
        var order = new Order(new OrderId(Guid.NewGuid()), customerId, items,shippingAddress);
        order.SetDeliveryFee(deliveryFee);
        return order;
    }

    public OrderId Id { get; private set; }
    public CustomerId CustomerId { get; private set; }
    public Customer Customer { get; private set; }
    public string PaymentIntentId { get; private set; } = string.Empty;

    public ShippingAddress ShippingAddress { get; private set; }

    public DateTime OrderDate { get; private set; }

    public List<OrderItem> OrderItems { get; private set; } = [];

    public decimal Subtotal { get; private set; }

    public decimal DeliveryFee { get; private set; }

    public OrderStatus OrderStatus { get; private set; }

    public void SetDeliveryFee(decimal deliveryFee)
    {
        DeliveryFee = deliveryFee;
    }


    public decimal GetTotal()
    {
        return Subtotal + DeliveryFee;
    }


}

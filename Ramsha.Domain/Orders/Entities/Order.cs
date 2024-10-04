
using Ramsha.Domain.Common;
using Ramsha.Domain.Customers;
using Ramsha.Domain.Customers.Entities;

namespace Ramsha.Domain.Orders.Entities;

public class Order : BaseEntity
{
    public OrderId Id { get; set; }
    public CustomerId CustomerId { get; set; }
    public Customer Customer { get; set; }

    public string PaymentIntentId { get; set; }

    public ShippingAddress ShippingAddress { get; set; }

    public DateTime OrderDate { get; set; } = DateTime.UtcNow;

    public List<OrderItem> OrderItems { get; set; } = [];

    public long Subtotal { get; set; }
    public long DeliveryFee { get; set; }

    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;

    public decimal GetTotal()
    {
        return Subtotal + DeliveryFee;
    }


}





namespace Ramsha.Domain.Orders.Entities;

public class OrderItem
{
    public OrderItem(OrderId orderId,ProductItemOrdered itemOrdered, decimal price, int quantity)
    {
        ItemOrdered = itemOrdered;
        Price = price;
        Quantity = quantity;
        OrderId = orderId;
    }

    public OrderItem()
    {

    }

    public int Id { get; set; }
    public ProductItemOrdered ItemOrdered { get; set; }
    public OrderId OrderId { get; set; }
    public FulfillmentRequestId FulfillmentRequestId { get; set; }

    public decimal Price { get; set; }
    public int Quantity { get; set; }
}

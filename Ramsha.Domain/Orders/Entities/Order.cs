
using Ramsha.Domain.Common;
using Ramsha.Domain.Customers;
using Ramsha.Domain.Customers.Entities;
using Ramsha.Domain.DeliveryAgents;
using Ramsha.Domain.Orders.Enums;
using Ramsha.Domain.Orders.Events;

namespace Ramsha.Domain.Orders.Entities;

public class Order : BaseEntity
{

    public Order()
    {

    }


    private Order(OrderId id, CustomerId customerId, string paymentIntentId, ShippingAddress shippingAddress)
    {
        Id = id;
        CustomerId = customerId;
        OrderStatus = OrderStatus.Pending;
        OrderDate = DateTime.UtcNow;
        ShippingAddress = shippingAddress;
        PaymentIntentId = paymentIntentId;
    }


    public static Order Create(CustomerId customerId, string paymentIntentId, ShippingAddress shippingAddress)
    {
        var order = new Order(new OrderId(Guid.NewGuid()), customerId, paymentIntentId, shippingAddress);
        order.RaiseDomainEvent(new NewOrderCreatedEvent(order.Id, order.ShippingAddress));
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
    public List<FulfillmentRequest> FulfillmentRequests { get; private set; } = [];

    public void SetDeliveryFee(decimal deliveryFee)
    {
        DeliveryFee = deliveryFee;
    }

    public void SetFulfillmentRequests(List<FulfillmentRequest> requests)
    {
        FulfillmentRequests.AddRange(requests);
        Subtotal = FulfillmentRequests.Sum(x => x.Subtotal);
        DeliveryFee = FulfillmentRequests.Sum(x => x.DeliveryFee);
    }

    public void DeliverFulfillmentRequest(FulfillmentRequestId fulfillmentRequestId)
    {
        var existFulfillment = FulfillmentRequests.FirstOrDefault(x => x.Id == fulfillmentRequestId);
        if (existFulfillment is null)
            return;

        if (FulfillmentRequests.Count(x => x.Status == FulfillmentRequestStatus.Delivered) >= FulfillmentRequests.Count - 1)
        {
            OrderStatus = OrderStatus.FullyShipped;
        }
        else
        {
            OrderStatus = OrderStatus != OrderStatus.FullyShipped ? OrderStatus.Processing : OrderStatus.FullyShipped;
        }
        existFulfillment.SetStatus(FulfillmentRequestStatus.Delivered);
    }

    public void ShipFulfillmentRequest(FulfillmentRequestId fulfillmentRequestId, DeliveryAgentId deliveryAgentId)
    {
        var existFulfillment = FulfillmentRequests.FirstOrDefault(x => x.Id == fulfillmentRequestId);
        if (existFulfillment is null)
            return;

        if (FulfillmentRequests.Count(
                  x => x.Status == FulfillmentRequestStatus.Shipped ||
                  x.Status == FulfillmentRequestStatus.Delivered) >= FulfillmentRequests.Count - 1)
        {
            OrderStatus = OrderStatus.FullyShipped;
        }
        else
        {
            OrderStatus = OrderStatus.Processing;
        }
        existFulfillment.Ship(deliveryAgentId);
    }


    public void ConfirmPaymentReceived()
    {
        OrderStatus = OrderStatus.PaymentReceived;
        FulfillmentRequests.ForEach(fulfillment => fulfillment.SetStatus(FulfillmentRequestStatus.Approved));
    }



    public decimal GetTotal()
    {
        return Subtotal + DeliveryFee;
    }


}

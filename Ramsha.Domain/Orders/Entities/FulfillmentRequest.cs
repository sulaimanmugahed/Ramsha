
using Ramsha.Domain.Common;
using Ramsha.Domain.Orders.Enums;
using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Domain.Orders.Entities;

public class FulfillmentRequest : BaseEntity
{

    private FulfillmentRequest() { }
    private FulfillmentRequest(FulfillmentRequestId id, SupplierId supplierId, List<OrderItem> items, decimal deliveryFee)
    {
        Id = id;
        SupplierId = supplierId;
        Status = FulfillmentRequestStatus.Pending;
        Created = DateTime.UtcNow;
        Items = items;
        DeliveryFee = deliveryFee;
        Subtotal = items.Sum(x => x.Price * x.Quantity);
    }

    public static FulfillmentRequest Create(SupplierId supplierId, List<OrderItem> items, decimal deliveryFee)
    => new(new FulfillmentRequestId(Guid.NewGuid()), supplierId, items, deliveryFee);

    public FulfillmentRequestId Id { get; set; }
    public SupplierId SupplierId { get; set; }
    public Supplier Supplier { get; set; }
    public OrderId OrderId { get; set; }
    public Order Order { get; set; }
    public decimal DeliveryFee { get; set; }
    public decimal Subtotal { get; set; }

    public FulfillmentRequestStatus Status { get; set; }
    public List<OrderItem> Items { get; set; } = [];
    public DateTime Created { get; private set; }

    public void SetStatus(FulfillmentRequestStatus status)
    {
        Status = status;
    }
}

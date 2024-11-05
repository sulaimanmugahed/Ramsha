
using Ramsha.Domain.Common;
using Ramsha.Domain.Orders;
using Ramsha.Domain.Suppliers.Enums;

namespace Ramsha.Domain.Suppliers.Entities;

public class FulfillmentRequest : BaseEntity
{

    private FulfillmentRequest() { }
    private FulfillmentRequest(FulfillmentRequestId id, SupplierId supplierId, OrderId orderId, List<FulfillmentRequestItem> items)
    {
        Id = id;
        SupplierId = supplierId;
        OrderId = orderId;
        Status = FulfillmentRequestStatus.Pending;
        Created = DateTime.UtcNow;
        Items = items;
    }

    public static FulfillmentRequest Create(SupplierId supplierId, OrderId orderId, List<FulfillmentRequestItem> items)
    => new(new FulfillmentRequestId(Guid.NewGuid()), supplierId, orderId, items);

    public FulfillmentRequestId Id { get; set; }
    public SupplierId SupplierId { get; set; }
    public OrderId OrderId { get; set; }
    public FulfillmentRequestStatus Status { get; set; }
    public List<FulfillmentRequestItem> Items { get; set; } = [];
    public DateTime Created { get; private set; }
}

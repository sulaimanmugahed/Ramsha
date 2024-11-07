

namespace Ramsha.Domain.Orders.Enums;

public enum OrderStatus
{
    Pending,
    PaymentReceived,
    Processing,
    FullyFulfilled,
    PartialShipped,
    PartialDelivered,
    FullyShipped,
    FullyDelivered,
    PaymentFailed,
    Cancelled,
    Completed
}


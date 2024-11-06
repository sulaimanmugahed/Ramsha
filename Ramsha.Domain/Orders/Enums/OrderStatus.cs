

namespace Ramsha.Domain.Orders.Enums;

public enum OrderStatus
{
    Pending,
    PaymentReceived,
    Processing,
    FullyFulfilled,
    PaymentFailed,
    Cancelled,
    Completed
}


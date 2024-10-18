

namespace Ramsha.Application.Dtos.Suppliers;


public record SupplyDto(
    Guid Id,
    decimal TotalAmount,
    string Status,
    string Currency,
    int TotalQuantity,
    DateTime Sent,
    DateTime? ApprovedAt
);

public record SupplyItemDto(
Guid Id,
Guid ProductId,
string Name,
string SKU,
int Quantity,
decimal WholesalePrice
);


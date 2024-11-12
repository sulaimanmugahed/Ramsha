

namespace Ramsha.Application.Dtos.Supplies;


public record SupplyDto(
    Guid Id,
    decimal TotalAmount,
    string Status,
    string Supplier,
    string Currency,
    int TotalQuantity,
    DateTime Sent,
    DateTime? ApprovedAt
);

public record SupplyDetailDto(
    Guid Id,
    decimal TotalAmount,
    string Supplier,
    string Status,
    string Currency,
    int TotalQuantity,
    List<SupplyItemDto> Items,
    DateTime Sent,
    DateTime? ApprovedAt
);

public record SupplyItemDto(
Guid Id,
Guid ProductId,
Guid ProductVariantId,
string Name,
string SKU,
string? ImageUrl,
int Quantity,
decimal WholesalePrice
);






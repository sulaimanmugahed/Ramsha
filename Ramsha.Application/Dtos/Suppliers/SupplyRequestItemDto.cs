

namespace Ramsha.Application.Dtos.Suppliers;

public record SupplyRequestItemDto(
Guid Id,
Guid ProductId,
Guid ProductVariantId,
string Sku,
int Quantity,
decimal WholesalePrice
);





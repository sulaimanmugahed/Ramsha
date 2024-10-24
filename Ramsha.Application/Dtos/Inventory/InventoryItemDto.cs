

using Ramsha.Application.Dtos.Products;

namespace Ramsha.Application.Dtos.Inventory;

public record InventoryItemDetailDto(
Guid Id,
string Name,
decimal WholePrice,
decimal RetailPrice,
string InventorySKU,
int Quantity,
string Status,
string? ImageUrl,
VariantDetailDto Variant
);

public record InventoryItemDto(
Guid Id,
string ProductName,
decimal WholePrice,
decimal RetailPrice,
string InventorySKU,
int Quantity,
string Status,
string? ImageUrl
);


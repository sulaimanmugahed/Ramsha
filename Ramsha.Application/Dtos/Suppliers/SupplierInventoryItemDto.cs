


namespace Ramsha.Application.Dtos.Suppliers;

public record SupplierInventoryItemDto(
    Guid InventoryItemId,
    string ProductName,
    string Sku,
    int AvailableQuantity,
    int TotalQuantity,
    StockPriceDto ActivePrice,
    string ImageUrl
);

public record StockPriceDto(
    decimal WholesalePrice,
    decimal RetailPrice,
    decimal FinalPrice,
    string Currency
);

public record StockDto(
Guid StockId,
int Quantity,
StockPriceDto Price
);







namespace Ramsha.Application.Dtos.Orders;

public record OrderItemDto(Guid InventoryItemId, string Name, string Sku, string ImageUrl, decimal Price, int Quantity);


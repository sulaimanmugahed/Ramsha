

namespace Ramsha.Application.Dtos.Orders;

public record OrderItemDto(Guid ProductId, string Name, string InventorySku, string ImageUrl, decimal Price, int Quantity);


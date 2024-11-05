namespace Ramsha.Application.Dtos.Suppliers;

public record FulfillmentRequestDto(Guid Id, Guid OrderId,string Status, DateTime Received);
public record FulfillmentRequestItemDto(Guid InventoryItemId,string Name,string ImageUrl,int Quantity,decimal Price,string Sku);

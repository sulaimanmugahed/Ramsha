
using Ramsha.Domain.Common;
using Ramsha.Domain.Common.Events;
using Ramsha.Domain.Products;


namespace Ramsha.Domain.Inventory.Events;

public sealed record InventoryItemCreatedEvent(
    InventoryItemId InventoryItemId,
    ProductId ProductId,
    ProductVariantId? ProductVariantId,
    int Quantity, Price RetailPrice, Price FinalPrice) : IDomainEvent
{
}


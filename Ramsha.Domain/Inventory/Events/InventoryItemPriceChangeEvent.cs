
using Ramsha.Domain.Common;
using Ramsha.Domain.Common.Events;
using Ramsha.Domain.Products;

namespace Ramsha.Domain.Inventory.Events;

public record InventoryItemPriceChangeEvent(
   ProductId ProductId,
   ProductVariantId? ProductVariantId,
    Price RetailPrice,
    Price FinalPrice) : IDomainEvent
{
}
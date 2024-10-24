using Ramsha.Domain.Common;
using Ramsha.Domain.Common.Events;
using Ramsha.Domain.Products;

namespace Ramsha.Domain.Inventory.Events;

public record StockAddedEvent(
     ProductId ProductId,
     ProductVariantId? ProductVariantId,
     Price SupplyItemPrice,
     int Quantity
) : IDomainEvent
{ }


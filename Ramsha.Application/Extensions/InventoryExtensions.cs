
using Ramsha.Application.Dtos.Inventory;
using Ramsha.Domain.Inventory.Entities;

namespace Ramsha.Application.Extensions;

public static class InventoryExtensions
{
    public static InventoryItemDto AsDto(this InventoryItem item)
    => new InventoryItemDto(
        item.Id.Value,
        item.ProductName,
        item.WholesalePrice,
        item.RetailPrice,
        item.InventorySKU,
        item.AvailableQuantity,
        item.Status.ToString(),
        item.ImageUrl
    );

    public static InventoryItemDetailDto AsDetailDto(this InventoryItem item)
  => new InventoryItemDetailDto(
      item.Id.Value,
      item.ProductName,
      item.WholesalePrice,
      item.RetailPrice,
      item.InventorySKU,
      item.AvailableQuantity,
      item.Status.ToString(),
      item.ImageUrl,
      item.ProductVariant.AsDetailsDto()
  );
}



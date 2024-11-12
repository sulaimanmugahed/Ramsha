using Ramsha.Application.Dtos.Supplies;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Application.Extensions;

public static class SuppliesExtensions
{
    public static SupplyItemDto AsSupplyItemDto(this SupplyItem item)
    => new SupplyItemDto(
        item.Id.Value,
        item.ItemSupplied.ProductId.Value,
        item.ItemSupplied.ProductVariantId.Value,
        item.ItemSupplied.Name,
        item.ItemSupplied.Sku,
        item.ItemSupplied.ImageUrl,
        item.Quantity,
        item.WholesalePrice
    );

    public static SupplyDto AsSupplyDto(this Supply supply)
=> new SupplyDto(
    supply.Id.Value,
    supply.Total,
    supply.Status.ToString(),
    supply.Supplier,
    supply.Currency.ToString(),
    supply.TotalQuantity,
    supply.Sent,
    supply.ApprovedAt);

    public static SupplyDetailDto AsSupplyDetailDto(this Supply supply)
=> new SupplyDetailDto(
   supply.Id.Value,
   supply.Total,
   supply.Supplier,
   supply.Status.ToString(),
   supply.Currency.ToString(),
   supply.TotalQuantity,
   supply.Items.Select(x => x.AsSupplyItemDto()).ToList(),
   supply.Sent,
   supply.ApprovedAt
   );
}

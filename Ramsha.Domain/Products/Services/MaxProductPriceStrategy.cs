
using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Products.Entities;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Domain.Products.Services;

public class MaxProductPriceStrategy : IProductPricingStrategy
{

    public (decimal, decimal)? CalculatePrice(List<InventoryItem> items)
    {
        if (items.Count == 0) return null;

        var inventory = items.MaxBy(i => i.FinalPrice);

        return (inventory?.RetailPrice ?? 0, inventory?.FinalPrice ?? 0);
    }
}
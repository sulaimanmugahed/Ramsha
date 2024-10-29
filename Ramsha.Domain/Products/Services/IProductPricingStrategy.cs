using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Products.Entities;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Domain.Products.Services;

public interface IProductPricingStrategy
{
    (decimal, decimal)? CalculatePrice(List<InventoryItem> items);

}

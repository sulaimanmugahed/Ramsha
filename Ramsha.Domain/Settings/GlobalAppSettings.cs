using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Domain.Settings;


public class GlobalAppSettings
{
    public InventoryPriority InventoryPriority { get; set; }
    public ProductPricingStrategy ProductPricingStrategy { get; set; }
}



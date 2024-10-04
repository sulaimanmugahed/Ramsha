
using Ramsha.Domain.Products;

namespace Ramsha.Domain.Suppliers.Entities;

public class ItemSupplied
{
    public ItemSupplied()
    {

    }
    public ItemSupplied(ProductId productId, string sku, string name)
    {
        ProductId = productId;
        SKU = sku;
        Name = name;
    }

    public ProductId ProductId { get; set; }
    public string Name { get; set; }
    public string SKU { get; set; }
}

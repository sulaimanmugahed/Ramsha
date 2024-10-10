
using Ramsha.Domain.Products;

namespace Ramsha.Domain.Suppliers.Entities;

public class ItemSupplied
{
    public ItemSupplied()
    {

    }
    public ItemSupplied(ProductId productId, ProductVariantId? productVariantId, string sku, string name)
    {
        ProductId = productId;
        ProductVariantId = productVariantId;
        Name = name;
        Sku = sku;
    }

    public ProductId ProductId { get; set; }
    public string Name { get; set; }
    public ProductVariantId? ProductVariantId { get; set; }
    public string Sku { get; set; }

}

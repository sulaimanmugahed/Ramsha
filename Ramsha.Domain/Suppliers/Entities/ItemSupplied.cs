
using Ramsha.Domain.Products;

namespace Ramsha.Domain.Suppliers.Entities;

public class ItemSupplied
{
    public ItemSupplied()
    {

    }
    public ItemSupplied(ProductId productId, ProductVariantId? productVariantId, string sku)
    {
        ProductId = productId;
        ProductVariantId = productVariantId;
        Sku = sku;
    }

    public ProductId ProductId { get; set; }
    public ProductVariantId? ProductVariantId { get; set; }
    public string Sku { get; set; }

}


using Ramsha.Domain.Products;

namespace Ramsha.Domain.Suppliers.Entities;

public class ItemSupplied
{
    private ItemSupplied()
    {

    }
    public ItemSupplied(ProductId productId, ProductVariantId? productVariantId, string name, string sku)
    {
        ProductId = productId;
        ProductVariantId = productVariantId;
        Name = name;
        Sku = sku;
    }

    public ProductId ProductId { get; set; }
    public ProductVariantId? ProductVariantId { get; set; }
    public string Name { get; set; }
    public string? ImageUrl { get; set; }
    public string Sku { get; set; }

}

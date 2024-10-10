
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Domain.Suppliers.Entities;

public class SupplyRequestItem
{
    public SupplyRequestItem()
    {

    }
    public SupplyRequestItem(SupplyRequestItemId id, ProductId productId, ProductVariantId? productVariantId, decimal wholesalePrice, int quantity)
    {
        Id = id;
        WholesalePrice = wholesalePrice;
        Quantity = quantity;
        ProductId = productId;
        ProductVariantId = productVariantId;
    }

    public static SupplyRequestItem Create(ProductId productId, ProductVariantId? productVariantId, decimal wholesalePrice, int quantity)
    {
        return new SupplyRequestItem(new SupplyRequestItemId(Guid.NewGuid()), productId, productVariantId, wholesalePrice, quantity);
    }

    public void SetWholesalePrice(decimal newPrice)
    {
        WholesalePrice = newPrice;
    }

    public void SetSKU(string sku)
    {
        SKU = sku;
    }

    public void IncrementQuantity(int count = 0)
    {
        if (count == 0)
            Quantity++;
        Quantity += count;
    }

    public SupplyRequestItemId Id { get; private set; }
    public SupplyRequestId SupplyRequestId { get; set; }
    public SupplyRequest SupplyRequest { get; set; }

    public ProductId ProductId { get; private set; }
    public Product Product { get; private set; }

    public ProductVariant? ProductVariant { get; private set; }
    public ProductVariantId? ProductVariantId { get; private set; }
    public string SKU { get; set; }

    public decimal WholesalePrice { get; private set; }
    public int Quantity { get; private set; }
}


using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Domain.Suppliers.Entities;

public class SupplyRequestItem
{
    public SupplyRequestItem()
    {

    }
    public SupplyRequestItem(SupplyRequestItemId id, ProductId productId, ProductVariantId productVariantId, SupplierId supplierId, int quantity)
    {
        Id = id;
        Quantity = quantity;
        ProductId = productId;
        ProductVariantId = productVariantId;
        SupplierId = supplierId;

    }

    public static SupplyRequestItem Create(ProductId productId, ProductVariantId productVariantId, SupplierId supplierId, int quantity)
    {
        return new SupplyRequestItem(new SupplyRequestItemId(Guid.NewGuid()), productId, productVariantId, supplierId, quantity);
    }


    public void SetQuantity(int quantity)
    {
        Quantity = quantity;
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
    public SupplierId SupplierId { get; private set; }
    public ProductVariantId ProductVariantId { get; private set; }
    public SupplierVariant SupplierVariant { get; private set; }
    public int Quantity { get; private set; }
}

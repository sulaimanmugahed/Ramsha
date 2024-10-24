
using Ramsha.Domain.Common;

using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Domain.Products.Entities;

public class SupplierProduct : BaseEntity
{
    public ProductId ProductId { get; set; }
    public SupplierId SupplierId { get; set; }
    public List<SupplierVariant> SupplierVariants { get; set; } = [];
    public Supplier? Supplier { get; set; }


    private SupplierProduct(ProductId productId, SupplierId supplierId)
    {
        ProductId = productId;
        SupplierId = supplierId;
    }


    public static SupplierProduct Create(ProductId productId, SupplierId supplierId)
    {
        return new SupplierProduct(productId, supplierId);
    }

    public void AddVariant(ProductVariantId productVariantId)
    {
        var newVariant = SupplierVariant.Create(SupplierId, ProductId, productVariantId);
        SupplierVariants.Add(newVariant);
    }

}

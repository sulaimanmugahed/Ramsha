
using Ramsha.Domain.Common;

using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Domain.Products.Entities;

public class SupplierProduct : BaseEntity
{
    public ProductId ProductId { get; set; }
    public SupplierId SupplierId { get; set; }
    public Product Product { get; set; }
    public List<SupplierVariant> SupplierVariants { get; set; } = [];
    public Supplier? Supplier { get; set; }

    public string Code { get; private set; }

    private SupplierProduct(ProductId productId, SupplierId supplierId)
    {
        ProductId = productId;
        SupplierId = supplierId;
    }

    public void SetCode(string code)
    {
        Code = code;
    }


    public static SupplierProduct Create(ProductId productId, SupplierId supplierId)
    {
        return new SupplierProduct(productId, supplierId);
    }

    public void AddVariant(SupplierVariant supplierVariant)
    {
        SupplierVariants.Add(supplierVariant);
    }



}



using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Domain.Products.Entities;

public class ProductImage
{
    public int Id { get; set; }
    public ProductId ProductId { get; set; }
    public ProductVariantId? ProductVariantId { get; set; }

    public SupplierId? SupplierId { get; set; }
    public Supplier? Supplier { get; set; }


    public string Url { get; set; }
    public string Path { get; set; }
    public bool IsHome { get; set; }
}



using Ramsha.Domain.Common;

namespace Ramsha.Domain.Products.Entities;

public class Brand : BaseEntity
{
    public BrandId Id { get; set; }
    public string Name { get; set; }
    public ICollection<Product> Products { get; set; }
}


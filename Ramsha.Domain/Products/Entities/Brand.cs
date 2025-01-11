

using Ramsha.Domain.Common;

namespace Ramsha.Domain.Products.Entities;

public class Brand : BaseEntity
{
    public BrandId Id { get; set; }
    public string Name { get; set; }


    private Brand(BrandId id, string name)
    {
        Id = id;
        Name = name;
    }
    public static Brand Create(string name) => new(new BrandId(Guid.NewGuid()), name);
    public void Update(string name)
    {
        Name = name;
    }

    public ICollection<Product> Products { get; set; } = [];
}


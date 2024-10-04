
using Ramsha.Domain.Common;

namespace Ramsha.Domain.Products.Entities;

public class Category : BaseEntity
{
    private Category(CategoryId id, string name)
    {
        Id = id;
        Name = name;
    }

    public CategoryId Id { get; set; }
    public string Name { get; set; }
    public CategoryId? ParentCategoryId { get; set; }
    public Category? ParentCategory { get; set; }
    public List<Category> SubCategories { get; set; } = [];
    public List<Product> Products { get; set; } = [];


    public static Category Create(string name)
    {
        return new Category(new CategoryId(Guid.NewGuid()), name);
    }

    public void AddChild(Category childCategory)
    {
        SubCategories.Add(childCategory);
    }

    public void SetParent(CategoryId parentCategoryId)
    {
        ParentCategoryId = parentCategoryId;
    }
}

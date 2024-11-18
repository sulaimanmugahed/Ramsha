
using Ramsha.Domain.Common;
using Ramsha.Domain.Inventory;
using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Products.Enums;
using Ramsha.Domain.Suppliers.Entities;


namespace Ramsha.Domain.Products.Entities;


public sealed class Product : BaseEntity, IAuditable, ISoftDeletable
{
    private Product() { }

    private Product(ProductId id, string name, string description, ProductStatus status)
    {
        Id = id;
        Name = name;
        Description = description;
        Status = status;
    }

    public ProductId Id { get; private set; }
    public string Name { get; private set; }
    public string Code { get; private set; }
    public string Description { get; private set; }
    public string? ImageUrl { get; private set; }
    public ProductStatus Status { get; private set; }
    public CategoryId CategoryId { get; private set; }
    public Category Category { get; private set; }
    public List<InventoryItem> Inventories { get; private set; } = [];
    public List<SupplierProduct> SupplierProducts { get; private set; } = [];
    public List<SupplierVariant> SupplierVariants { get; private set; } = [];
    public List<ProductVariant> Variants { get; private set; } = [];
    public List<ProductOption> Options { get; private set; } = [];
    public List<ProductTag> Tags { get; set; } = [];
    public BrandId? BrandId { get; private set; }
    public Brand? Brand { get; private set; }
    public SeoSettings SeoSettings { get; private set; }

    public List<Rating> Ratings { get; set; } = [];


    public void SetSeoSettings(SeoSettings seoSettings)
    {
        SeoSettings = seoSettings;
    }


    public void SetName(string name)
    {
        if (!string.IsNullOrEmpty(name))
            Name = name;
    }

    public void SetDescription(string description)
    {
        if (!string.IsNullOrEmpty(description))
            Description = description;
    }

    public static Product Create(string name, string description)
    {
        var product = new Product(new ProductId(Guid.NewGuid()), name, description, ProductStatus.Draft);
        return product;
    }


    public void SetCategory(CategoryId categoryId)
    {
        CategoryId = categoryId;
    }

    public void SetBrand(BrandId brandId)
    {
        BrandId = brandId;
    }

    public void SetCode(string code)
    {
        Code = code;
    }

    public void SetImage(string url)
    {
        if (!string.IsNullOrEmpty(url))
            ImageUrl = url;
    }

    public void SetStatus(ProductStatus status)
    {
        Status = status;
    }

    public void RemoveTags(List<string> tags)
    {
        if (Tags.Count > 0)
        {
            foreach (var tag in tags)
            {
                var existTag = Tags.FirstOrDefault(x => x.Tag.Name.ToLower() == tag.ToLower());

                if (existTag is not null)
                    Tags.Remove(existTag);
            }
        }
    }

    public void AddVariant(ProductVariant variant)
    {
        Variants.Add(variant);
    }

    public void AddTag(Tag tag)
    {
        if (Tags.Any(t => t.TagId.Value == tag.Id.Value && t.ProductId == Id))
            return;

        Tags.Add(new ProductTag(this, tag.Id));
    }


    public void AddOption(Option option, int priority = 0)
    {
        var productOption = new ProductOption(this, option, priority);
        Options.Add(productOption);
    }


    public Guid CreatedBy { get; set; }
    public DateTime Created { get; set; }
    public Guid? LastModifiedBy { get; set; }
    public DateTime? LastModified { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? Deleted { get; set; }
    public Guid? DeletedBy { get; set; }
}


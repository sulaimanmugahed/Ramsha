
using Ramsha.Domain.Common;
using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Products.Enums;


namespace Ramsha.Domain.Products.Entities;


public sealed class Product : BaseEntity, IAuditable, ISoftDeletable
{
    // i add this constractor to generate fakedata with bogus
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
    public int TotalQuantity { get; private set; }
    public decimal? Price => Variants.FirstOrDefault()?.Price;
    public decimal? FinalPrice => Variants.FirstOrDefault()?.FinalPrice;
    public string Description { get; private set; }
    public string? ImageUrl { get; private set; }
    public ProductStatus Status { get; set; }
    public CategoryId CategoryId { get; set; }
    public Category Category { get; set; }
    public List<InventoryItem> Inventories { get; set; } = [];
    public List<ProductVariant> Variants { get; set; } = [];
    public List<ProductOption> Options { get; set; } = [];
    public List<ProductTag> Tags { get; set; } = [];
    public BrandId? BrandId { get; set; }
    public Brand? Brand { get; set; }
    public SeoSettings SeoSettings { get; set; }


    public void SetSeoSettings(SeoSettings seoSettings)
    {
        SeoSettings = seoSettings;
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

    public void SetImage(string url)
    {
        ImageUrl = url;
    }

    public void SetStatus(ProductStatus status)
    {
        Status = status;
    }


    public void AddVariant(ProductVariant variant)
    {
        Variants.Add(variant);
    }

    public void AddTag(Tag tag)
    {
        if (Tags.Any(t => t.Tag.Name.Equals(tag.Name, StringComparison.OrdinalIgnoreCase)))
            return;

        Tags.Add(new(this, tag));
    }

    public void AddOption(OptionId optionId)
    {
        var productOption = new ProductOption(this, optionId);
        Options.Add(productOption);
    }


    public void UpdateQuantity()
    {
        TotalQuantity = Inventories.Select(x => x.Quantity).Sum();
    }


    public Guid CreatedBy { get; set; }
    public DateTime Created { get; set; }
    public Guid? LastModifiedBy { get; set; }
    public DateTime? LastModified { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? Deleted { get; set; }
    public Guid? DeletedBy { get; set; }
}


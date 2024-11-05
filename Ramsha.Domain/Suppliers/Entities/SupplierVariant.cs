
using Ramsha.Domain.Common;
using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Domain.Suppliers.Entities;

public class SupplierVariant : BaseEntity
{
    private SupplierVariant(SupplierId supplierId, ProductId productId, ProductVariantId productVariantId)
    {
        ProductId = productId;
        SupplierId = supplierId;
        ProductVariantId = productVariantId;
    }

    public static SupplierVariant Create(SupplierId supplierId, ProductId productId, ProductVariantId productVariantId)
    {
        return new SupplierVariant(supplierId, productId, productVariantId);
    }

    public SupplierId SupplierId { get; private set; }
    public Supplier? Supplier { get; private set; }
    public ProductVariantId ProductVariantId { get; private set; }
    public SupplierProduct SupplierProduct { get; private set; }
    public ProductId ProductId { get; set; }
    public ProductVariant ProductVariant { get; private set; }
    public InventoryItem InventoryItem { get; private set; }
    public List<ProductImage> SupplierProductImages { get; private set; } = [];
    public string Code { get; private set; } = string.Empty;

    public string Description { get; private set; }
    public decimal WholesalePrice { get; private set; }
    public decimal RetailPrice { get; private set; }


    public void SetVariant(ProductVariantId productVariantId)
    {
        ProductVariantId = productVariantId;
    }

    public void SetDescription(string? description)
    {
        if (!string.IsNullOrEmpty(description))
            Description = description;
    }

    public void SetPrice(decimal wholesalePrice)
    {
        WholesalePrice = wholesalePrice;
        RetailPrice = ApplyMarkupPercentage(wholesalePrice);
    }

    public void SetCode(string code)
    {
        Code = code;
    }


    public void AddImage(string url, string fullPath, bool isHome = false)
    {
        var image = new ProductImage
        {
            Url = url,
            Path = fullPath,
            IsHome = isHome
        };

        SupplierProductImages.Add(image);
    }

    public void RemoveImage(ProductImage image)
    {
        SupplierProductImages.Remove(image);
    }

    public void RemoveImageByPath(string fullPath)
    {
        var existImage = SupplierProductImages.FirstOrDefault(x => x.Path == fullPath);
        if (existImage is not null)
        {
            SupplierProductImages.Remove(existImage);
        }
    }

    public ProductImage? GetImageByUrl(string url)
    {
        return SupplierProductImages.FirstOrDefault(x => x.Url == url);
    }

    public void AddOrUpdateRating(string username, decimal value, string review = "")
    {
        var existingRating = Ratings.FirstOrDefault(r => r.RatingBy.Equals(username, StringComparison.OrdinalIgnoreCase));

        if (existingRating != null)
        {
            existingRating.Value = value;
            existingRating.Review = review;
        }
        else
        {
            var rating = new Rating(value, ProductId, username, review);
            rating.SetVariant(ProductVariantId);
            rating.SetSupplier(SupplierId);
            Ratings.Add(rating);
        }

        NumberOfRatings = Ratings.Count;
        AverageRating = Ratings.Average(r => r.Value);
    }

    public List<Rating> Ratings { get; set; } = [];
    public decimal AverageRating { get; private set; }
    public int NumberOfRatings { get; private set; }

    private decimal ApplyMarkupPercentage(decimal wholePrice)
    {
        decimal markupAmount = wholePrice * 0.03m;
        return wholePrice + markupAmount;
    }


}

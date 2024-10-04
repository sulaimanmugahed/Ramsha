

using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Inventory.Services;

namespace Ramsha.Domain.Products.Entities;

public class ProductVariant
{
    public ProductVariant(ProductVariantId id, ProductId productId, string name, string description)
    {
        Id = id;
        ProductId = productId;
        Name = name;
        Description = description;
    }

    public void Update(string? name, string? description)
    {
        if (name is not null)
            Name = name;

        if (description is not null)
            Description = description;
    }

    public void RemoveValue(OptionId optionId, OptionValueId valueId)
    {
        var existVariantValue = VariantValues
                 .FirstOrDefault(x => x.OptionId == optionId
                 && x.OptionValueId == valueId);

        if (existVariantValue is not null)
            VariantValues.Remove(existVariantValue);

    }

    public void RemoveImage(ProductImage image)
    {
            Images.Remove(image);
    }

    public void RemoveImageByPath(string fullPath)
    {
        var existImage = Images.FirstOrDefault(x => x.Path == fullPath);
        if (existImage is not null)
        {
            Images.Remove(existImage);
        }
    }

     public ProductImage? GetImageByUrl(string url)
    {
        return Images.FirstOrDefault(x => x.Url == url);
        
    }


    public ProductVariantId Id { get; set; }
    public ProductId ProductId { get; set; }
    public Product Product { get; set; }
    public string Name { get; private set; }
    public string? Description { get; private set; }

    public string SKU { get; private set; }
    public string? ImageUrl { get; private set; }

    public decimal Price { get; private set; }
    public decimal FinalPrice { get; private set; }
    public int TotalQuantity { get; private set; }

    public List<Discount> Discounts { get; set; } = [];
    public List<VariantValue> VariantValues { get; set; } = [];
    public List<InventoryItem> InventoryItems { get; set; } = [];

    public List<ProductImage> Images { get; set; } = [];
    public List<Rating> Ratings { get; set; } = [];

    public decimal AverageRating { get; private set; }
    public int NumberOfRatings { get; private set; }



    public void SetBasePrice(decimal price)
    {
        Price = price;
    }

    public void AddRating(decimal value, string username, string review = "")
    {
        var rating = new Rating(value, ProductId, username, review);
        Ratings.Add(rating);
        NumberOfRatings = Ratings.Count;
        AverageRating = Ratings.Average(r => r.Value);
    }

    public static ProductVariant Create(ProductId productId, string name, string description)
    {
        return new(new ProductVariantId(Guid.NewGuid()), productId, name, description);
    }

    public void AddValue(OptionId optionId, OptionValueId optionValueId)
    {
        var value = new VariantValue(this, optionId, optionValueId);
        VariantValues.Add(value);
    }

    public void AddImage(string url, string fullPath, bool isHome = false)
    {
        ImageUrl = isHome ? url : null;
        var image = new ProductImage
        {
            Url = url,
            Path = fullPath,
            IsHome = isHome
        };

        Images.Add(image);
    }


    public void SetSKU(string sku)
    {
        SKU = sku;
    }
    public void UpdatePrice(decimal newPrice)
    {
        Price = newPrice;
        decimal discountedPrice = ApplyDiscount(newPrice);
        FinalPrice = discountedPrice;
    }

    public void UpdateQuantity()
    {
        TotalQuantity = InventoryItems.Select(x => x.Quantity).Sum();
    }

    private decimal ApplyDiscount(decimal price)
    {
        var activeDiscounts = Discounts
                        .Where(d => d.IsValid)
                        .ToList();

        if (activeDiscounts.Count > 0)
        {
            var discountChain = DiscountChain.Create();

            foreach (var discount in activeDiscounts)
            {
                var strategy = DiscountStrategyFactory.Create(discount);

                if (strategy is not null)
                    discountChain.AddDiscount(strategy);

            }
            return discountChain.ApplyDiscount(price);
        }
        return price;
    }

}

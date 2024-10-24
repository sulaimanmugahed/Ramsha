

using Ramsha.Domain.Common;
using Ramsha.Domain.Common.Events;
using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Inventory.Services;
using Ramsha.Domain.Products.Enums;
using Ramsha.Domain.Products.Events;
using Ramsha.Domain.Products.Services;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Domain.Products.Entities;

public class ProductVariant : BaseEntity
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
    public List<SupplierVariant> SupplierVariants { get; private set; } = [];

    public string Name { get; private set; }
    public string? Description { get; private set; }
    public string SKU { get; private set; }
    public string? ImageUrl { get; private set; }
    public decimal Price { get; private set; }
    public decimal FinalPrice { get; private set; }
    public int TotalQuantity { get; private set; }

    public List<VariantValue> VariantValues { get; set; } = [];
    public List<InventoryItem> InventoryItems { get; set; } = [];

    public List<ProductImage> Images { get; set; } = [];



    public void SetBasePrice(decimal price)
    {
        Price = price;
    }

    public void AdjustQuantity(int quantityChange)
    {
        if (TotalQuantity + quantityChange < 0)
        {
            throw new InvalidOperationException("Cannot reduce quantity below zero.");
        }
        TotalQuantity += quantityChange;
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

    public void UpdatePriceBasedOnStrategy(ProductPricingStrategy productPricingStrategy, List<InventoryItem> inventories)
    {
        var strategy = ProductPricingStrategyFactory.Create(productPricingStrategy);
        (decimal basePrice, decimal finalPrice) = strategy.CalculatePrice(inventories) ?? (0, 0);
        Price = basePrice;
        FinalPrice = finalPrice;
    }

    public void UpdatePrice(decimal price, decimal finalPrice)
    {
        Price = price;
        FinalPrice = finalPrice;
    }

    public void UpdateQuantity()
    {
        TotalQuantity = InventoryItems.Select(x => x.TotalQuantity).Sum();
    }

    public void IncreaseQuantity(int? value = null)
    {
        TotalQuantity += value ?? 1;
    }

    public void DecreaseQuantity(int? value = null)
    {
        TotalQuantity -= value ?? 1;
    }


}

using Ramsha.Domain.Common;
using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Products.Enums;
using Ramsha.Domain.Products.Services;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Domain.Products.Entities;

public class ProductVariant : BaseEntity
{
    private ProductVariant()
    {

    }
    public ProductVariant(ProductVariantId id, ProductId productId, DimensionalWeight dimensionalWeight, decimal weight)
    {
        Id = id;
        ProductId = productId;
        Dimensions = dimensionalWeight;
        Weight = weight;
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
    public string Code { get; private set; }
    public string? ImageUrl { get; private set; }
    public decimal Price { get; private set; }
    public decimal FinalPrice { get; private set; }
    public int TotalQuantity { get; private set; }
    public int AvailableQuantity { get; private set; }
    public decimal Weight { get; private set; }
    public bool IsDefault { get; private set; }
    public DimensionalWeight Dimensions { get; private set; }
    public List<VariantValue> VariantValues { get; set; } = [];
    public List<InventoryItem> InventoryItems { get; set; } = [];
    public List<ProductImage> Images { get; set; } = [];

    public void SetDimensional(DimensionalWeight dimensionalWeight)
    {
        Dimensions = dimensionalWeight;
    }

    public void SetWeight(decimal weight)
    {
        Weight = weight;
    }


    public void SetImage(string url)
    {
        ImageUrl = url;
    }


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


    public static ProductVariant Create(ProductId productId, DimensionalWeight dimensionalWeight, decimal weight)
    {
        return new(new ProductVariantId(Guid.NewGuid()), productId, dimensionalWeight, weight);
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


    public void SetCode(string code)
    {
        Code = code;
    }

    public void SetDefault(bool isDefault)
    {
        IsDefault = isDefault;
    }

    // public void UpdatePriceBasedOnStrategy(ProductPricingStrategy productPricingStrategy, List<InventoryItem> inventories)
    // {
    //     var strategy = ProductPricingStrategyFactory.Create(productPricingStrategy);
    //     (decimal basePrice, decimal finalPrice) = strategy.CalculatePrice(inventories) ?? (0, 0);
    //     Price = basePrice;
    //     FinalPrice = finalPrice;
    // }

    public void UpdatePrice(decimal price, decimal finalPrice)
    {
        Price = price;
        FinalPrice = finalPrice;
    }

    public void UpdateQuantity(int availableQuantity, int totalQuantity)
    {
        TotalQuantity = totalQuantity;
        AvailableQuantity = availableQuantity;
    }

    public void IncreaseQuantity(int? value = null)
    {
        TotalQuantity += value ?? 1;
    }

    public void DecreaseQuantity(int? value = null)
    {
        TotalQuantity -= value ?? 1;
    }

    public decimal CalculateShippingWeight(int quantity)
    {
        return Math.Max(Weight, Dimensions.Calculate()) * quantity;
    }


}

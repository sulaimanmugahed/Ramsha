
using Ramsha.Domain.Common;
using Ramsha.Domain.Common.Events;
using Ramsha.Domain.Inventory.Enums;
using Ramsha.Domain.Inventory.Events;
using Ramsha.Domain.Inventory.Services;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;
using Ramsha.Domain.Products.Enums;
using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Domain.Inventory.Entities;

public class InventoryItem : BaseEntity, IAuditable
{
    public InventoryItem()
    {

    }
    private InventoryItem(InventoryItemId id, ProductId productId, ProductVariantId? productVariantId, SupplierId supplierId, string productName)
    {
        Id = id;
        SupplierId = supplierId;
        ProductId = productId;
        ProductName = productName;
        ProductVariantId = productVariantId;
    }

    public static InventoryItem Create(
          ProductId productId,
          ProductVariantId? productVariantId,
          SupplierId supplierId,
          string productName,
          int quantity,
          ProductPrice wholePrice,
          string sku
         )
    {
        var newItem = new InventoryItem(new InventoryItemId(Guid.NewGuid()),
        productId,
        productVariantId,
        supplierId,
        productName);

        newItem.AdjustQuantity(quantity);
        newItem.UpdatePrice(wholePrice);
        newItem.SetSKU(sku, supplierId.Value.ToString()[..8]);

        newItem.RaiseDomainEvent(new InventoryItemCreatedEvent(newItem.Id, newItem.ProductId, newItem.ProductVariantId, newItem.Quantity, newItem.RetailPrice, newItem.FinalPrice));

        return newItem;
    }


    public InventoryItemId Id { get; set; }
    public int Quantity { get; set; }
    public string InventorySKU { get; private set; }
    public string ProductName { get; private set; }
    public string? ImageUrl { get; private set; }
    public decimal WholesalePrice { get; private set; }
    public decimal RetailPrice { get; private set; }
    public decimal FinalPrice { get; private set; }

    public InventoryStatus Status { get; set; }
    public ProductId ProductId { get; set; }
    public SupplierId SupplierId { get; set; }
    public ProductVariantId? ProductVariantId { get; set; }
    public ProductVariant ProductVariant { get; set; }
    public Product Product { get; set; }
    public Supplier Supplier { get; set; }
    public List<ProductPrice> Prices { get; set; } = [];
    public List<Discount> Discounts { get; set; } = [];
    public List<InventoryItemImage> InventoryItemImages { get; set; } = [];
    public Guid CreatedBy { get; set; }
    public DateTime Created { get; set; }
    public Guid? LastModifiedBy { get; set; }
    public DateTime? LastModified { get; set; }

    public void UpdateInventory(int quantity, ProductPrice productPrice)
    {
        AdjustQuantity(quantity);
        var existPrice = Prices.Where(x =>
          x.Type == PriceType.Wholesale &&
          x.Currency == productPrice.Currency &&
          x.Value == productPrice.Value)
          .MaxBy(x => x.EffectiveDate);

        if (existPrice is null)
        {
            UpdatePrice(productPrice);
        }

        RaiseDomainEvent(new InventoryItemUpdatedEvent(Id, ProductId, ProductVariantId, Quantity, RetailPrice, FinalPrice));
    }


    public void UpdatePrice(ProductPrice wholePrice)
    {
        var retailPrice = ProductPrice.Create(
                   ApplyMarkupPercentage(wholePrice.Value),
                    wholePrice.Currency, PriceType.Retail);

        Prices.Add(wholePrice);
        Prices.Add(retailPrice);

        WholesalePrice = wholePrice.Value;
        RetailPrice = retailPrice.Value;
        FinalPrice = ApplyDiscount(RetailPrice);

        RaiseDomainEvent(new InventoryItemPriceChangeEvent(ProductId, ProductVariantId, RetailPrice, FinalPrice));
    }

    public void AddDiscount(Discount discount)
    {
        var discountChain = DiscountChain.Create();
        var strategy = DiscountStrategyFactory.Create(discount);
        if (strategy is not null)
            discountChain.AddDiscount(strategy);

        FinalPrice = discountChain.ApplyDiscount(RetailPrice);
        Discounts.Add(discount);

        RaiseDomainEvent(new InventoryItemPriceChangeEvent(ProductId, ProductVariantId, RetailPrice, FinalPrice));
    }

    public void SetSKU(string sku, string username)
    {
        InventorySKU = GenerateInventorySKU(sku, username);
    }

    public void SetVariant(ProductVariantId? productVariantId)
    {
        ProductVariantId = productVariantId;
    }

    private static string GenerateInventorySKU(string sku, string supplierUsername)
    {
        return $"{sku}-{supplierUsername.Substring(0, Math.Min(6, supplierUsername.Length)).ToUpper().Replace(" ", "-")}";
    }


    public void AdjustQuantity(int quantityChange)
    {
        if (Quantity + quantityChange < 0) return;

        Quantity += quantityChange;
        RaiseDomainEvent(new InventoryItemQuantityChangeEvent(ProductId, ProductVariantId, quantityChange));
    }

    public void AddImage(string url, string fullPath, bool isHome = false)
    {
        var image = new InventoryItemImage
        {
            Url = url,
            Path = fullPath,
            IsHome = isHome
        };

        InventoryItemImages.Add(image);
    }

    public void RemoveImage(InventoryItemImage image)
    {
        InventoryItemImages.Remove(image);
    }

    public void RemoveImageByPath(string fullPath)
    {
        var existImage = InventoryItemImages.FirstOrDefault(x => x.Path == fullPath);
        if (existImage is not null)
        {
            InventoryItemImages.Remove(existImage);
        }
    }

    public InventoryItemImage? GetImageByUrl(string url)
    {
        return InventoryItemImages.FirstOrDefault(x => x.Url == url);
    }

    private decimal ApplyMarkupPercentage(decimal wholePrice)
    => wholePrice * (1 + 0.30m);

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

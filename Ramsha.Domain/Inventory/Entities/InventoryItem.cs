
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
    private InventoryItem(InventoryItemId id, ProductId productId, SupplierId supplierId, string productName, int quantity)
    {
        Id = id;
        Quantity = quantity;
        SupplierId = supplierId;
        ProductId = productId;
        ProductName = productName;
    }

    public static InventoryItem Create(
          ProductId productId,
          SupplierId supplierId,
          string productName,
         int quantity)
    {
        return new InventoryItem(new InventoryItemId(Guid.NewGuid()),
        productId,
        supplierId,
        productName,
        quantity);
    }

    public void AddRatalPrice()
    {

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
    public Guid CreatedBy { get; set; }
    public DateTime Created { get; set; }
    public Guid? LastModifiedBy { get; set; }
    public DateTime? LastModified { get; set; }

    public void UpdateInventory(int quantity, decimal wholePrice, Currency currency = Currency.USD)
    {
        Quantity += quantity;

        var existPrice = Prices.Where(x =>
          x.Type == PriceType.Wholesale &&
          x.Currency == currency &&
          x.Value == wholePrice)
          .MaxBy(x => x.EffectiveDate);

        if (existPrice is null)
        {
            UpdatePrice(wholePrice, currency);
        }

    }


    public void UpdatePrice(decimal wholePrice, Currency currency = Currency.USD)
    {
        var WholePrice = ProductPrice.Create(

                      wholePrice,
                       currency, PriceType.Wholesale);

        var retailPrice = ProductPrice.Create(
                   ApplyMarkupPercentage(wholePrice),
                    currency, PriceType.Retail);

        Prices.Add(WholePrice);
        Prices.Add(retailPrice);

        WholesalePrice = wholePrice;
        RetailPrice = retailPrice.Value;
        FinalPrice = ApplyDiscount(RetailPrice);
        DomainEvents.Raise(new InventoryUpdatedEvent(this));
    }

    public void AddDiscount(Discount discount)
    {
        Discounts.Add(discount);
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
        return $"{sku}-{supplierUsername.ToUpper()}";
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



using Ramsha.Domain.Common;
using Ramsha.Domain.Inventory.Services;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Domain.Inventory.Entities;

public class Stock : BaseEntity
{

    private Stock()
    {

    }
    public StockId Id { get; private set; }
    public InventoryItemId InventoryItemId { get; private set; }
    public int Quantity { get; private set; }
    public Price WholesalePrice { get; set; }
    public DateTime Supplied { get; private set; }
    public List<Discount> Discounts { get; private set; } = [];
    public Price RetailPrice { get; private set; }
    public Price FinalPrice { get; private set; }


    private Stock(StockId stockId, InventoryItemId inventoryItemId, int quantity)
    {
        Id = stockId;
        InventoryItemId = inventoryItemId;
        Quantity = quantity;
        Supplied = DateTime.UtcNow;
    }

    public static Stock Create(InventoryItemId inventoryItemId, int quantity, Price wholesalePrice)
    {
        var newStock = new Stock(new StockId(Guid.NewGuid()), inventoryItemId, quantity);
        newStock.SetPrice(wholesalePrice);
        return newStock;
    }

    public void DecreaseQuantity(int quantity)
    {
        if (Quantity - quantity < 0)
            throw new Exception("quantity not available");
        Quantity -= quantity;
    }


    public void SetPrice(Price wholesalePrice)
    {
        WholesalePrice = new Price(wholesalePrice.Amount, wholesalePrice.Currency);

        RetailPrice = new Price(ApplyMarkupPercentage(wholesalePrice).Amount, wholesalePrice.Currency);
        FinalPrice = new Price(ApplyDiscount(RetailPrice).Amount, RetailPrice.Currency);
    }

    public void AddDiscount(Discount discount)
    {
        var discountChain = DiscountChain.Create();
        var strategy = DiscountStrategyFactory.Create(discount);
        if (strategy is not null)
            discountChain.AddDiscount(strategy);

        FinalPrice = discountChain.ApplyDiscount(RetailPrice);
        Discounts.Add(discount);

    }

    private Price ApplyMarkupPercentage(Price wholePrice)
    {
        decimal markupAmount = wholePrice.Amount * 0.03m;
        return new Price(wholePrice.Amount + markupAmount, wholePrice.Currency);
    }


    private Price ApplyDiscount(Price price)
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


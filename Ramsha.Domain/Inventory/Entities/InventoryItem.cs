
using Ramsha.Domain.Common;
using Ramsha.Domain.Inventory.Enums;
using Ramsha.Domain.Inventory.Events;
using Ramsha.Domain.Inventory.Services;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;
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
        ProductId = productId;
        ProductName = productName;
        SupplierId = supplierId;
        ProductVariantId = productVariantId;
    }

    public static InventoryItem Create(
          ProductId productId,
          ProductVariantId? productVariantId,
          SupplierId supplierId,
          string productName,
          string sku
         )
    {
        var newItem = new InventoryItem(new InventoryItemId(Guid.NewGuid()),
        productId,
        productVariantId,
        supplierId,
        productName);
        newItem.SetSKU(sku, supplierId.ToString());
        return newItem;
    }

    public InventoryItemId Id { get; set; }
    public int AvailableQuantity { get; set; }
    public int TotalQuantity { get; set; }
    public string InventorySKU { get; private set; }
    public string ProductName { get; private set; }
    public string? ImageUrl { get; private set; }
    public decimal WholesalePrice { get; private set; }
    public decimal RetailPrice { get; private set; }
    public decimal FinalPrice { get; private set; }
    public string Currency { get; private set; }

    public InventoryStatus Status { get; set; }
    public ProductId ProductId { get; set; }
    public ProductVariantId? ProductVariantId { get; set; }
    public ProductVariant ProductVariant { get; set; }
    public Product Product { get; set; }
    public SupplierId SupplierId { get; set; }
    public Supplier Supplier { get; set; }

    public Guid CreatedBy { get; set; }
    public DateTime Created { get; set; }
    public Guid? LastModifiedBy { get; set; }
    public DateTime? LastModified { get; set; }

    public StockSelectionType StockSelectionType { get; private set; }

    public List<Stock> Stocks { get; private set; } = [];

    public void SetStockSelectionType(StockSelectionType inventoryPriority)
    {
        StockSelectionType = inventoryPriority;
        UpdateInventoryBasedOnSelectionStockStrategy(StockSelectionType);
    }

    public void AddStock(int quantity, Price wholesalePrice)
    {
        var stock = Stock.Create(Id, quantity, new Price(wholesalePrice.Amount, wholesalePrice.Currency));
        Stocks.Add(stock);
        IncreaseTotalQuantity(quantity);
        UpdateInventoryBasedOnSelectionStockStrategy(StockSelectionType);
        RaiseDomainEvent(new StockAddedEvent(ProductId, ProductVariantId, wholesalePrice, quantity));
    }


    public void UpdateInventoryBasedOnSelectionStockStrategy(StockSelectionType stockSelectionType)
    {
        var strategy = StockSelectionStrategyFactory.Create(StockSelectionType);
        var stock = strategy.SelectStock(Stocks);
        if (stock.HasValue)
        {
            AvailableQuantity = stock.Value.quantity;
            WholesalePrice = stock.Value.wholesalePrice;
            RetailPrice = stock.Value.retailPrice;
            FinalPrice = stock.Value.finalPrice;
            Currency = stock.Value.currency;

        }
    }

    public void IncreaseTotalQuantity(int quantity)
    {
        TotalQuantity += quantity;
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
        return $"{sku}-{supplierUsername[..Math.Min(6, supplierUsername.Length)].ToUpper().Replace(" ", "-")}";
    }
}

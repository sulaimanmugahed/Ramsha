
using Ramsha.Domain.Common;
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
    private InventoryItem(InventoryItemId id, ProductId productId, ProductVariantId? productVariantId, SupplierId supplierId)
    {
        Id = id;
        ProductId = productId;
        SupplierId = supplierId;
        ProductVariantId = productVariantId;
    }

    public static InventoryItem Create(
          ProductId productId,
          ProductVariantId? productVariantId,
          SupplierId supplierId,
          string sku,
          string productName
         )
    {
        var newItem = new InventoryItem(new InventoryItemId(Guid.NewGuid()),
        productId,
        productVariantId,
        supplierId);
        newItem.SetSKU(sku);
        newItem.SetName(productName);
        return newItem;
    }

    public InventoryItemId Id { get; set; }
    public int AvailableQuantity { get; set; }
    public int TotalQuantity { get; set; }
    public string InventorySKU { get; private set; }
    public string? ImageUrl { get; private set; }
    public Price WholesalePrice { get; private set; }
    public Price RetailPrice { get; private set; }
    public Price FinalPrice { get; private set; }
    public string ProductName { get; private set; }
    public InventoryStatus Status { get; set; }
    public ProductId ProductId { get; set; }

    public ProductVariantId? ProductVariantId { get; set; }
    public ProductVariant ProductVariant { get; set; }
    public SupplierVariant SupplierVariant { get; set; }

    public Product Product { get; set; }
    public SupplierId SupplierId { get; set; }
    public Supplier Supplier { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime Created { get; set; }
    public Guid? LastModifiedBy { get; set; }
    public DateTime? LastModified { get; set; }
    public StockSelectionType StockSelectionType { get; private set; }
    public int TotalSales { get; private set; }



    public List<Stock> Stocks { get; private set; } = [];

    public void SetStockSelectionType(StockSelectionType inventoryPriority)
    {
        StockSelectionType = inventoryPriority;
        UpdateInventoryBasedOnSelectionStockStrategy(StockSelectionType);
    }

    public void SetName(string name)
    {
        ProductName = name;
    }

    public void AddStock(int quantity, Price wholesalePrice)
    {
        var stock = Stock.Create(Id, quantity, new Price(wholesalePrice.Amount, wholesalePrice.Currency));
        Stocks.Add(stock);
        IncreaseTotalQuantity(quantity);
        UpdateInventoryBasedOnSelectionStockStrategy(StockSelectionType);
        RaiseDomainEvent(new StockUpdatedEvent(ProductId, ProductVariantId));
    }

    public void ApplyDiscount(Discount discount)
    {
        var stock = GetStock(StockSelectionType);
        if (stock is null)
        {
            throw new Exception("stock null");
        }

        FinalPrice = stock.ApplyDiscount(discount);
    }


    public void UpdateInventoryBasedOnSelectionStockStrategy(StockSelectionType stockSelectionType = StockSelectionType.FIFO)
    {
        var stock = GetStock(stockSelectionType);
        if (stock is not null)
        {
            AvailableQuantity = stock.Quantity;
            WholesalePrice = stock.WholesalePrice;
            RetailPrice = stock.RetailPrice;
            FinalPrice = stock.FinalPrice;
        }
    }

    public void IncreaseTotalQuantity(int quantity)
    {
        TotalQuantity += quantity;
    }

    private void DecreaseInventoryQuantity(int quantity)
    {
        TotalQuantity -= quantity;
        AvailableQuantity -= quantity;
        TotalSales += quantity;
    }



    public void DecreaseQuantity(int quantity)
    {

        var currentStock = GetStock(StockSelectionType);
        if (currentStock is null)
        {
            throw new Exception("stock null");
        }

        currentStock.DecreaseQuantity(quantity);

        if (currentStock.Quantity == 0)
        {
            Stocks.Remove(currentStock);
            Status = Stocks.Count > 1 ? InventoryStatus.PendingRestock : InventoryStatus.OutOfStock;
        }

        DecreaseInventoryQuantity(quantity);
        UpdateInventoryBasedOnSelectionStockStrategy(StockSelectionType);
        RaiseDomainEvent(new StockUpdatedEvent(ProductId, ProductVariantId));
    }

    public Stock? GetStock(StockSelectionType stockSelectionType)
    {
        var strategy = StockSelectionStrategyFactory.Create(stockSelectionType);
        return strategy.SelectStock(Stocks);
    }



    public void SetSKU(string sku)
    {
        InventorySKU = sku;
    }

    public void SetVariant(ProductVariantId? productVariantId)
    {
        ProductVariantId = productVariantId;
    }
}

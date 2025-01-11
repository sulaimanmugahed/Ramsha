
using System.Linq.Expressions;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Inventory;
using Ramsha.Application.DTOs.Common;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Inventory;
using Ramsha.Domain.Inventory.Entities;
using Ramsha.Persistence.Contexts;
using Ramsha.Persistence.Helpers;
using Microsoft.EntityFrameworkCore;
using Ramsha.Domain.Products;
using Ramsha.Application.Dtos.Catalog;
using Microsoft.Extensions.Options;
using Ramsha.Domain.Settings;
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Persistence.Repositories;

public class InventoryItemRepository(
ApplicationDbContext context
, IOptionsSnapshot<GlobalAppSettings> settings)
: GenericRepository<InventoryItem, InventoryItemId>(context),
IInventoryItemRepository
{
    private readonly DbSet<InventoryItem> _items = context.Set<InventoryItem>();



    public async Task<InventoryItem?> MaxBy(Expression<Func<InventoryItem, object>> prop)
    {
        return await _items.OrderByDescending(prop).FirstOrDefaultAsync();
    }


    public async Task<InventoryItem?> GetWithDetails(Expression<Func<InventoryItem, bool>> criteria)
    {
        return await _items
         .Include(i => i.Stocks)
        .Include(i => i.Product)
        .ThenInclude(x => x.Category)
        .FirstOrDefaultAsync(criteria);
    }

    public async Task<IEnumerable<InventoryItem>> GetAllWithDetails(Expression<Func<InventoryItem, bool>> criteria)
    {
        return await _items
        .Include(i => i.Product)
        .ThenInclude(x => x.Category)
        .Where(criteria)
        .ToListAsync();
    }

    public async Task<IEnumerable<InventoryItem>> GetItemListDetails()
    {
        return await _items
        .AsSplitQuery()
        .Include(i => i.Product)
        .ThenInclude(x => x.Category)
        .Include(x => x.ProductVariant)
        .ThenInclude(x => x.VariantValues)
        .ToListAsync();
    }

    public async Task<IEnumerable<InventoryItem>> GetAllWithDetails()
    {
        return await _items
        .Include(i => i.Product)
        .ThenInclude(x => x.Category)
        .ToListAsync();
    }

    public async Task<PaginationResponseDto<CatalogInventoryItemDetailDto>> GetCatalogItemsPagedListAsync(ProductId productId, PaginationParams paginationParams, SortingParams? sortingParams = null, FilterParams? filterParams = null, ProductVariantId? productVariantId = null)
    {
        var query = _items
        .Include(x => x.SupplierVariant)
        .ThenInclude(x => x.SupplierProductImages)
        .Where(x => x.ProductId == productId)
        .AsQueryable();

        if (productVariantId is not null)
        {
            query = query.Where(x => x.ProductVariantId == productVariantId);
        }
        else
        {

            var variantId = await GetVariantIdByPricingStrategy(productId, settings.Value.ProductPricingStrategy);
            if (variantId != null)
            {
                query = query.Where(x => x.ProductVariantId == variantId);
            }
        }



        if (sortingParams is not null)
        {
            query = query.OrderByColumnName(sortingParams.ColumnsSort);
        }
        else
        {
            query = settings.Value.ProductPricingStrategy switch
            {
                ProductPricingStrategy.MaxPrice => query.OrderByDescending(x => x.FinalPrice.Amount),
                _ => query.OrderBy(x => x.FinalPrice.Amount),
            };
        }

        if (filterParams is not null)
        {
            var globalFilter = filterParams.GlobalFilterValue;
            if (!string.IsNullOrEmpty(globalFilter))
            {
                query = query.Where(p => p.ProductName.Contains(globalFilter));
            }

            if (filterParams.ColumnsFilter.HasItems())
            {
                query = query.FilterByColumn(filterParams.ColumnsFilter);
            }
        }


        return await Paged(
          query.Select(p => p.AsCatalogInventoryItemDetailDto()),
          paginationParams
          );
    }


    public async Task<PaginationResponseDto<InventoryItemDto>> GetItemsPagedListAsync(PaginationParams paginationParams, SortingParams? sortingParams = null, FilterParams? filterParams = null)
    {
        var query = _items.AsQueryable();

        if (sortingParams is not null)
        {
            query = query.OrderByColumnName(sortingParams.ColumnsSort);
        }

        if (filterParams is not null)
        {
            var globalFilter = filterParams.GlobalFilterValue;
            if (!string.IsNullOrEmpty(globalFilter))
            {
                query = query.Where(p => p.ProductName.Contains(globalFilter));
            }

            if (filterParams.ColumnsFilter.HasItems())
            {
                query = query.FilterByColumn(filterParams.ColumnsFilter);
            }
        }

        return await Paged(
          query.Select(p => p.AsDto()),
          paginationParams
          );
    }

    public async Task<int> GetVariantQuantity(ProductVariantId productVariantId)
    {
        var items = await _items.Where(i => i.ProductVariantId == productVariantId).ToListAsync();
        return items.Select(x => x.AvailableQuantity).Sum();
    }

    public async Task<InventoryItem?> GetInventoryItemBySku(string sku)
    {
        return await _items.FirstOrDefaultAsync(x => x.InventorySKU == sku);
    }

    public async Task<InventoryItem?> GetWithStocksDetail(InventoryItemId id)
    {
        return await _items.Include(x => x.Stocks)
        .ThenInclude(x => x.Discounts).FirstOrDefaultAsync(x => x.Id == id);
    }

    private async Task<ProductVariantId?> GetVariantIdByPricingStrategy(
    ProductId productId,
    ProductPricingStrategy pricingStrategy)
    {
        var variantQuery = _items
            .Where(x => x.ProductId == productId && x.SupplierVariant != null)
            .GroupBy(x => x.ProductVariantId);

        return pricingStrategy switch
        {
            ProductPricingStrategy.MinPrice => await variantQuery
                .OrderBy(group => group.Min(x => x.FinalPrice.Amount))
                .Select(group => group.Key)
                .FirstOrDefaultAsync(),

            ProductPricingStrategy.MaxPrice => await variantQuery
                .OrderByDescending(group => group.Max(x => x.FinalPrice.Amount))
                .Select(group => group.Key)
                .FirstOrDefaultAsync(),

            _ => null
        };
    }
}


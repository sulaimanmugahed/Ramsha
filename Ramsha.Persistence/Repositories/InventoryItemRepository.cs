
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

namespace Ramsha.Persistence.Repositories;

public class InventoryItemRepository(ApplicationDbContext context)
: GenericRepository<InventoryItem, InventoryItemId>(context),
IInventoryItemRepository
{
    private readonly DbSet<InventoryItem> _items = context.Set<InventoryItem>();

    public async Task<InventoryItem?> GetWithDetails(Expression<Func<InventoryItem, bool>> criteria)
    {
        return await _items
        .Include(i => i.Product)
        .ThenInclude(x => x.Category)
        .FirstOrDefaultAsync(criteria);
    }

    public async Task<IEnumerable<InventoryItem>> GetAllWithDetails(Expression<Func<InventoryItem, bool>> criteria)
    {
        return await _items
        .Include(i => i.Product)
        .ThenInclude(x => x.Category)
        .Include(x => x.Discounts)
        .Include(x => x.Prices)
        .Where(criteria)
        .ToListAsync();
    }

    public async Task<IEnumerable<InventoryItem>> GetItemListDetails()
    {
        return await _items
        .AsSplitQuery()
        .Include(i => i.Product)
        .ThenInclude(x => x.Category)
        .Include(x => x.Discounts)
        .Include(x => x.ProductVariant)
        .ThenInclude(x => x.VariantValues)
        .ToListAsync();
    }

    public async Task<IEnumerable<InventoryItem>> GetAllWithDetails()
    {
        return await _items
        .Include(i => i.Product)
        .ThenInclude(x => x.Category)
        .Include(x => x.Discounts)
        .Include(x => x.Prices)
        .ToListAsync();
    }

    public async Task<PaginationResponseDto<CatalogInventoryItemDetailDto>> GetCatalogItemsPagedListAsync(ProductId productId, ProductVariantId productVariantId, PaginationParams paginationParams, SortingParams? sortingParams = null, FilterParams? filterParams = null)
    {
        var query = _items
        .Include(x => x.InventoryItemImages)
        .Include(x => x.Supplier)
        .Where(x => x.ProductId == productId && x.ProductVariantId == productVariantId)
        .AsQueryable();

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
        return items.Select(x => x.Quantity).Sum();
    }

    public async Task<InventoryItem?> GetInventoryItemBySku(string sku)
    {
        return await _items.FirstOrDefaultAsync(x => x.InventorySKU == sku);
    }
}


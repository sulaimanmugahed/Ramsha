
using System.Linq.Expressions;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Dtos.Inventory;
using Ramsha.Application.DTOs.Common;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Inventory;
using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Products;

namespace Ramsha.Application.Contracts.Persistence;

public interface IInventoryItemRepository : IGenericRepository<InventoryItem, InventoryItemId>
{
    Task<IEnumerable<InventoryItem>> GetAllWithDetails(Expression<Func<InventoryItem, bool>> criteria);
    Task<InventoryItem?> GetWithDetails(Expression<Func<InventoryItem, bool>> criteria);
    Task<IEnumerable<InventoryItem>> GetAllWithDetails();

    Task<InventoryItem?> GetInventoryItemBySku(string sku);


    Task<IEnumerable<InventoryItem>> GetItemListDetails();
    Task<int> GetVariantQuantity(ProductVariantId productVariantId);

    Task<PaginationResponseDto<InventoryItemDto>> GetItemsPagedListAsync(PaginationParams paginationParams, SortingParams? sortingParams = null, FilterParams? filterParams = null);

    Task<PaginationResponseDto<CatalogInventoryItemDetailDto>> GetCatalogItemsPagedListAsync(ProductId productId, ProductVariantId productVariantId, PaginationParams paginationParams, SortingParams? sortingParams = null, FilterParams? filterParams = null);

}

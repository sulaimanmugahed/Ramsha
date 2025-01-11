using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Ramsha.Application.Constants;
using Ramsha.Application.Extensions;
using Ramsha.Application.Features.Catalog.Queries.GetCatalogInventoryItems;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products;

namespace Ramsha.Application.Helpers;

public static class CacheKeysHelper
{
    public static class CatalogCacheKeys
    {
        public const string Prefix = "Catalog";

        public static string GetProductPagedKey(PagedParams? pagedParams = null)
        {
            return pagedParams is not null ? $"{Prefix}:Paged:{Uri.EscapeDataString(JsonSerializer.Serialize(pagedParams))}" : $"{Prefix}:Paged";
        }

        public static string GetCategoriesKey()
        {
            return $"{Prefix}:Categories";
        }

        public static string GetCatalogVariantKey(string productId, string? variantId = null)
        => $"{Prefix}:{productId}:{variantId}";

        public static string GetProductDetailKey(string productId)
        {
            return $"{Prefix}:{productId}:Detail";
        }

        public static string GetInventoryItemsKey(string productId, string? variantId = null, PagedParams? pagedParams = null)
        {
            return pagedParams is null ? $"{Prefix}:{productId}:{variantId}:InventoryItems" : $"{Prefix}:{productId}:{variantId}:InventoryItems:{Uri.EscapeDataString(JsonSerializer.Serialize(pagedParams))}";
        }
    }

    public static class StatisticsCacheKeys
    {
        public const string Prefix = "Statistics";
        public static string GetSupplierStatisticsKey(string supplierId)
        {
            return $"{Prefix}:Supplier:{supplierId}";
        }

        public static string GetAdminStatisticsKey()
        {
            return $"{Prefix}:Admin";
        }
    }


    public static class ProductCacheKeys
    {
        public const string Prefix = "Products";

        public static string GetProductDetailKey(string productId)
        {
            return $"{Prefix}:{productId}:Detail";
        }

        public static string GetProductVariantsKey(string productId)
        {
            return $"{Prefix}:{productId}:Variants";
        }
        public static string GetProductVariantKey(string productId, string variantId)
        {
            return $"{Prefix}:{productId}:Variants:{variantId}";
        }

        public static string GetProductPagedKey(PagedParams? pagedParams = null)
        {
            return pagedParams is not null ? $"{Prefix}:Paged:{Uri.EscapeDataString(JsonSerializer.Serialize(pagedParams))}" : $"{Prefix}:Paged";
        }
    }

    public static class InventoryCacheKeys
    {
        public const string Prefix = "Inventory";

        public static string GetInventoryItemsPagedKey(string productId, string variantId, PagedParams? pagedParams = null)
        {
            return pagedParams is null ? $"{Prefix}:Paged:{productId}:{variantId}" : $"{Prefix}:Paged:{productId}:{variantId}:{Uri.EscapeDataString(JsonSerializer.Serialize(pagedParams))}";
        }

    }

    public static class PermissionsCacheKeys
    {
        public const string Prefix = "Permissions";

        public static string GetUserPermissionsKey(string username)
        {
            return $"{Prefix}:Users:{username}";
        }



    }

}


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Ramsha.Application.Constants;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products;

namespace Ramsha.Application.Helpers;

public static class CacheKeysHelper
{
    public static class CatalogCacheKeys
    {
        public const string Prefix = "Catalog";

        public static string GetProductPagedKey(PagedParams pagedParams)
        {
            return $"{Prefix}:Paged:{Uri.EscapeDataString(JsonSerializer.Serialize(pagedParams))}";
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

        public static string GetProductPagedKey(PagedParams pagedParams)
        {
            return $"{Prefix}:Paged:{Uri.EscapeDataString(JsonSerializer.Serialize(pagedParams))}";
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


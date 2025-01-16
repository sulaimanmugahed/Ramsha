using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts.BackgroundJobs;
using Ramsha.Application.Contracts.Caching;
using Ramsha.Application.Helpers;
using Ramsha.Domain.Products;

namespace Ramsha.Application.Services;

public class ProductService(ICacheService cacheService)
{

    public void InvalidateRelatedCachedData(ICacheService cacheService)
    {
        cacheService.RemoveAllByPrefix(CacheKeysHelper.CatalogCacheKeys.Prefix);
        cacheService.RemoveAllByPrefix(CacheKeysHelper.ProductCacheKeys.Prefix);
    }

    public void InvalidateRelatedCachedData()
    {
        cacheService.RemoveAllByPrefix(CacheKeysHelper.CatalogCacheKeys.Prefix);
        cacheService.RemoveAllByPrefix(CacheKeysHelper.ProductCacheKeys.Prefix);
    }

    public void InvalidateRelatedCachedData(string productId, ICacheService cacheService)
    {
        cacheService.RemoveAllByPrefix(CacheKeysHelper.CatalogCacheKeys.Prefix + ":" + productId);
        cacheService.RemoveAllByPrefix(CacheKeysHelper.ProductCacheKeys.Prefix + ":" + productId);
    }

}

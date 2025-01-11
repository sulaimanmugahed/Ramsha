using MediatR;
using Ramsha.Application.Contracts.BackgroundJobs;
using Ramsha.Application.Contracts.Caching;
using Ramsha.Application.Helpers;
using Ramsha.Domain.Products.Events;

namespace Ramsha.Application.Features.Products.EventsHandlers;

public class ProductDataChangedEventHandler(IBackgroundJobService backgroundJobService, ICacheService cacheService) : INotificationHandler<ProductDataChangedEvent>
{
    public Task Handle(ProductDataChangedEvent notification, CancellationToken cancellationToken)
    {
        backgroundJobService.Enqueue(() => InvalidateRelatedCachedData(notification.ProductId.Value.ToString()));
        return Task.CompletedTask;
    }

    public void InvalidateRelatedCachedData(string productId)
    {
        cacheService.RemoveAllByPrefix(CacheKeysHelper.StatisticsCacheKeys.Prefix);
        cacheService.RemoveAllByPrefix(CacheKeysHelper.CatalogCacheKeys.GetProductPagedKey());
        cacheService.RemoveAllByPrefix(CacheKeysHelper.ProductCacheKeys.GetProductPagedKey());
        cacheService.RemoveAllByPrefix(CacheKeysHelper.CatalogCacheKeys.Prefix + ":" + productId);
        cacheService.RemoveAllByPrefix(CacheKeysHelper.ProductCacheKeys.Prefix + ":" + productId);
    }
}

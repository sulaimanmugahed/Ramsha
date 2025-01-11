using MediatR;
using Ramsha.Application.Contracts.BackgroundJobs;
using Ramsha.Application.Contracts.Caching;
using Ramsha.Application.Helpers;
using Ramsha.Domain.Inventory.Events;


namespace Ramsha.Application.Features.Inventory.EventsHandlers;
public class StockAddedEventHandler(
IBackgroundJobService backgroundJobService,
ICacheService cacheService
) : INotificationHandler<StockUpdatedEvent>
{
    public Task Handle(StockUpdatedEvent notification, CancellationToken cancellationToken)
    {
        backgroundJobService.Enqueue(() => InvalidateCache(notification.ProductId.Value.ToString(), notification.ProductVariantId.Value.ToString()));
        return Task.CompletedTask;
    }

    public void InvalidateCache(string productId, string variantId)
    {
        cacheService.RemoveAllByPrefix(CacheKeysHelper.InventoryCacheKeys.Prefix);
        cacheService.RemoveAllByPrefix(CacheKeysHelper.StatisticsCacheKeys.Prefix);
        cacheService.RemoveAllByPrefix(CacheKeysHelper.CatalogCacheKeys.Prefix + ":" + productId);
    }
}

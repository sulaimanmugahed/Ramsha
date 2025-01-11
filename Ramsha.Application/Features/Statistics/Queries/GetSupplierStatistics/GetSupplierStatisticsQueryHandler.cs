using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.BackgroundJobs;
using Ramsha.Application.Contracts.Caching;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Statistics;
using Ramsha.Application.Helpers;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Inventory.Enums;

namespace Ramsha.Application.Features.Statistics.Queries.GetSupplierStatistics;

public class GetSupplierStatisticsQueryHandler(
    ISupplierRepository supplierRepository,
    IFulfillmentRequestRepository fulfillmentRequestRepository,
    IInventoryItemRepository inventoryItemRepository,
    IAuthenticatedUserService authenticatedUserService,
    ICacheService cacheService,
    IBackgroundJobService backgroundJobService
) : IRequestHandler<GetSupplierStatisticsQuery, BaseResult<SupplierStatistics>>
{
    public async Task<BaseResult<SupplierStatistics>> Handle(GetSupplierStatisticsQuery request, CancellationToken cancellationToken)
    {
        var supplier = await supplierRepository.GetAsync(x => x.Username == authenticatedUserService.UserName);
        if (supplier is null)
            return new Error(ErrorCode.ErrorInIdentity);

        var key = CacheKeysHelper.StatisticsCacheKeys.GetSupplierStatisticsKey(supplier.Id.Value.ToString());

        var supplierStatistics = await cacheService.GetObject<SupplierStatistics>(key);
        if (supplierStatistics is null)
        {
            var fulfillments = await fulfillmentRequestRepository.GetAllAsync(x => x.SupplierId == supplier.Id);
            var items = await inventoryItemRepository.GetAllAsync(x => x.SupplierId == supplier.Id);


            var salesPerformance = fulfillments
              .GroupBy(o => new { o.Created.Month, o.Created.Year })
              .Select(g => new SalesPerformance
              (new DateTime(g.Key.Year, g.Key.Month, 1).ToString("MMMM"),
                   g.Sum(o => o.BaseRevenue)
              ))
              .OrderBy(g => g.Month)
              .ToList();

            var topItemSale = await inventoryItemRepository.MaxBy(x => x.TotalSales);

            supplierStatistics = new SupplierStatistics(
                fulfillments.Count,
                items.Count,
                fulfillments.Sum(x => x.BaseRevenue),
                topItemSale?.ProductName,

                [
                    new (InventoryStatus.InStock.ToString(),items.Count(x=> x.Status == InventoryStatus.InStock)),
                new (InventoryStatus.OutOfStock.ToString(),items.Count(x=> x.Status == InventoryStatus.OutOfStock)),
                new (InventoryStatus.PendingRestock.ToString(),items.Count(x=> x.Status == InventoryStatus.PendingRestock)),
                ],
                salesPerformance
            );

            backgroundJobService.Enqueue(() => cacheService.SetObject(key, supplierStatistics, TimeSpan.FromMinutes(10)));

        }

        return supplierStatistics;

    }
}

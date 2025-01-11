using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts.BackgroundJobs;
using Ramsha.Application.Contracts.Caching;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Statistics;
using Ramsha.Application.Helpers;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Statistics.Queries.GetAdminStatistics;

public class GetAdminStatisticsQueryHandler(
IOrderRepository orderRepository,
ICacheService cacheService,
ICategoryRepository categoryRepository,
ICustomerRepository customerRepository,
ISupplierRepository supplierRepository,
IProductRepository productRepository,
IBackgroundJobService backgroundJobService
) : IRequestHandler<GetAdminStatisticsQuery, BaseResult<AdminStatistics>>
{
    public async Task<BaseResult<AdminStatistics>> Handle(GetAdminStatisticsQuery request, CancellationToken cancellationToken)
    {
        var key = CacheKeysHelper.StatisticsCacheKeys.GetAdminStatisticsKey();
        var adminStatistics = await cacheService.GetObject<AdminStatistics>(key);
        if (adminStatistics is null)
        {
            var orders = await orderRepository.GetAllAsync(x => x.OrderStatus == Domain.Orders.Enums.OrderStatus.Completed, x => x.OrderItems);
            var customers = await customerRepository.GetAllAsync();
            var suppliers = await supplierRepository.GetAllAsync();
            var products = await productRepository.GetAllAsync();

            var salesPerformance = orders
             .GroupBy(o => new { o.OrderDate.Month, o.OrderDate.Year })
             .Select(g => new SalesPerformance
             (new DateTime(g.Key.Year, g.Key.Month, 1).ToString("MMMM"),
                  g.Sum(o => o.OrderItems.Sum(x => x.Markup))
             ))
             .OrderBy(g => g.Month)
             .ToList();

            var totalCategoriesProducts = await categoryRepository.GetTotalMainCategoriesProducts();

            adminStatistics = new AdminStatistics(
            orders.Count(),
            customers.Count,
            suppliers.Count,
            products.Count,
           salesPerformance,
           totalCategoriesProducts
            );

            backgroundJobService.Enqueue(() => cacheService.SetObject(key, adminStatistics, TimeSpan.FromMinutes(10)));
        }

        return adminStatistics;
    }
}

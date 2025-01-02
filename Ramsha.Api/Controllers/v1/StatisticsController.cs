using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Inventory.Enums;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]
public class StatisticsController(
    IFulfillmentRequestRepository fulfillmentRequestRepository,
    ISupplierRepository supplierRepository,
    IInventoryItemRepository inventoryItemRepository,
    IAuthenticatedUserService authenticatedUserService
) : BaseApiController
{
    [HttpGet("supplier")]
    public async Task<BaseResult<SupplierStatistics>> GetSupplierStatistics()
    {
        var supplier = await supplierRepository.GetAsync(x => x.Username == authenticatedUserService.UserName);
        if (supplier is null)
            return new Error(ErrorCode.ErrorInIdentity);

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

        return new SupplierStatistics(
            fulfillments.Count,
            items.Count,
            fulfillments.Sum(x => x.BaseRevenue),
            [
                new (InventoryStatus.InStock.ToString(),items.Count(x=> x.Status == InventoryStatus.InStock)),
                new (InventoryStatus.OutOfStock.ToString(),items.Count(x=> x.Status == InventoryStatus.OutOfStock)),
                new (InventoryStatus.PendingRestock.ToString(),items.Count(x=> x.Status == InventoryStatus.PendingRestock)),
            ],
            salesPerformance
        );


    }


}


public record SupplierStatistics(
int TotalFulfillments,
int TotalSuppliedProducts,
decimal TotalRevenue,
List<ProductStockDistribution> ProductStockDistribution,
List<SalesPerformance> SalesPerformance
);

public record SalesPerformance(
    string Month,
    decimal Revenue
);

public record ProductStockDistribution(
    string Label,
    int Value
);

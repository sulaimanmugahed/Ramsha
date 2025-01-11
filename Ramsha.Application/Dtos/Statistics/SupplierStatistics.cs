using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Application.Dtos.Statistics;

public record SupplierStatistics(
int TotalFulfillments,
int TotalSuppliedProducts,
decimal TotalRevenue,
string TopSellingProduct,
List<ProductStockDistribution> ProductStockDistribution,
List<SalesPerformance> SalesPerformance
);


public record ProductStockDistribution(
    string Label,
    int Value
);

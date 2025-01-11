

namespace Ramsha.Application.Dtos.Statistics;

public record AdminStatistics(
    int TotalCompletedOrders,
    int TotalCustomers,
    int TotalSuppliers,
    int TotalProducts,
List<SalesPerformance> SalesPerformance,
List<TotalCategoryProducts> TotalCategoriesProducts
);


public record TotalCategoryProducts(
string Label,
int Value
);


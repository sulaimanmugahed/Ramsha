import { SalesPerformance } from "./statistic";

export type ProductStockDistribution = {
    label: string;
    value: number;
};


export type SupplierStatistics = {
    totalFulfillments: number;
    totalSuppliedProducts: number;
    totalRevenue: number;
    topSellingProduct: string
    productStockDistribution: ProductStockDistribution[];
    salesPerformance: SalesPerformance[];
};
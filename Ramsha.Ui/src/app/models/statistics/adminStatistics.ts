import { SalesPerformance } from "./statistic";


export type TotalCategoryProducts = {
    label: string;
    value: number
}

export type AdminStatistics = {
    totalCompletedOrders: number;
    totalCustomers: number;
    totalSuppliers: number;
    totalProducts: number;
    salesPerformance: SalesPerformance[];
    totalCategoriesProducts: TotalCategoryProducts[]
};
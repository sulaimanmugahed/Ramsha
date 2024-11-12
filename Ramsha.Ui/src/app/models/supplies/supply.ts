import { CurrencyCode } from "../common/currency";

export type SupplyStatus = "Pending" | "Approved" | "Rejected";

export type Supply = {
    id: string;
    supplier: string;
    totalAmount: number;
    status: SupplyStatus
    currency: CurrencyCode;
    totalQuantity: number;
    sent: string;
    approvedAt?: string;
};

export type SupplyItem = {
    id: string;
    productId: string;
    productVariantId: string;
    name: string;
    sku: string;
    imageUrl?: string | null;
    quantity: number;
    wholesalePrice: number;
}

export type SupplyDetail = {
    items: SupplyItem[];
} & Supply

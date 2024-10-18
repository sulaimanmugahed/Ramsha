export type Supply = {
    id: string;              // Unique identifier for the supply request
    totalAmount: number;      // Total amount for the supply request
    status: "Pending" | "Approved" | "Rejected"; // Status of the supply request
    currency: string;         // Currency used for the amount
    totalQuantity: number;    // Total quantity of products in the supply request
    sent: string;             // ISO string representing when the supply request was sent
    approvedAt?: string;      // ISO string representing when the supply request was approved (optional, since it may not always be approved)
};
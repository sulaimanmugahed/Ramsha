import { create } from "zustand";
import { ProductDto } from "../models/products/product";

// Define the dialog types and corresponding data types
type DialogType = 'createProduct' | 'filter' | 'showVariants' | 'deleteProduct' | 'editProduct';

type DialogDataMap = {
    createProduct: null;  // No data for createProduct
    filter: null;              // Explicitly null for filter
    showVariants: string;      // String data for showVariants
    deleteProduct: ProductDto; // ProductDto data for deleteProduct
    editProduct: string;
};


type DialogState<T extends DialogType = DialogType> = {
    open: boolean;
    type: T;
    data: DialogDataMap[T];
};


type AdminProductStore = {
    dialogState: DialogState | null;
    openDialog: <T extends DialogType>(
        type: T,
        data?: DialogDataMap[T]
    ) => void;
    closeDialog: () => void;
};


const useAdminProductStore = create<AdminProductStore>((set) => ({
    dialogState: null,

    openDialog: (type, data) => {
        set(() => ({
            dialogState: {
                open: true,
                type: type,
                data: data || null,
            },
        }));
    },

    closeDialog: () => set(() => ({
        dialogState: null,
    })),
}));

export default useAdminProductStore;



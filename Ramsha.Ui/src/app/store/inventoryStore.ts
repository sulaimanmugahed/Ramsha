import { create } from "zustand"
import { PagedParams } from "../models/common/commonModels"
import { OnChangeFn, RowSelectionState } from "@tanstack/react-table"

type InventoryStore = {
    itemsQueryParams: PagedParams,
    changePageNumber: (page: number) => void,
    changePageSize: (size: number) => void,
    rowSelection: RowSelectionState,
    onRowSelection: OnChangeFn<RowSelectionState>,
}

export const useInventoryStore = create<InventoryStore>((set) => ({
    itemsQueryParams: {
        paginationParams: {
            pageNumber: 1,
            pageSize: 5
        },
        sortingParams: {
            columnsSort: [
                {
                    sortColumn: 'retailPrice',
                    descending: true
                }
            ]
        }
    },
    changePageNumber: (page) => {
        set((state) => ({
            itemsQueryParams: {
                ...state.itemsQueryParams,
                paginationParams: {
                    ...state.itemsQueryParams.paginationParams,
                    pageNumber: page
                }
            }
        }))
    },
    changePageSize: (size) => {
        set((state) => ({
            itemsQueryParams: {
                ...state.itemsQueryParams,
                paginationParams: {
                    ...state.itemsQueryParams.paginationParams,
                    pageSize: size,
                },
            },
        }));
    },
    rowSelection: {},
    onRowSelection: (updater) => {
        if (typeof updater === "function") {
            return set((state) => ({ rowSelection: updater(state.rowSelection) }));
        }
    }
}))
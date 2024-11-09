import { usePagedParams } from "./routeHooks";

export const useSorting = (maxColumns: number = 2) => {
    const [params, setParams] = usePagedParams();
    const sortingParams = params.sortingParams || { columnsSort: [] };

    // Toggle sorting: Ascending -> Descending -> None
    const handleSortChange = (columnId: string) => {
        const columnsSort = sortingParams.columnsSort;
        const existingSort = columnsSort.find(sort => sort.sortColumn === columnId);

        if (existingSort) {
            // Toggle to descending or remove sorting if already descending
            if (existingSort.descending) {
                const updatedSorting = columnsSort.filter(sort => sort.sortColumn !== columnId);
                setParams({ sortingParams: { columnsSort: updatedSorting } });
            } else {
                // Update to descending if currently ascending
                const updatedSorting = columnsSort.map(sort =>
                    sort.sortColumn === columnId
                        ? { sortColumn: columnId, descending: true }
                        : sort
                );
                setParams({ sortingParams: { columnsSort: updatedSorting } });
            }
        } else {
            // Add new sort column if limit not exceeded
            if (columnsSort.length < maxColumns) {
                const updatedSorting = [...columnsSort, { sortColumn: columnId, descending: false }];
                setParams({ sortingParams: { columnsSort: updatedSorting } });
            }
        }
    };

    // Set specific direction for a column, or remove it if limit is reached
    const setSpecificColumn = (columnId: string, direction: "asc" | "desc") => {
        // Determine if the sort should be ascending or descending
        const descending = direction === "desc";

        // Apply a single sort, overriding any existing sorts
        const updatedSorting = [{ sortColumn: columnId, descending }];

        // Update the sorting params to contain only this one sort rule
        setParams({ sortingParams: { columnsSort: updatedSorting } });
    };


    // Clears all sorting
    const clearSorting = () => {
        setParams({ sortingParams: { columnsSort: [] } });
    };

    return {
        handleSortChange,
        setSpecificColumn,
        sortingParams,
        clearSorting
    };
};

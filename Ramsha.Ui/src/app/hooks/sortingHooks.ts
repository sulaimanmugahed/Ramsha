import { usePagedParams } from "./routeHooks";

export const useSorting = () => {

    const [params, setParams] = usePagedParams()

    const sortingParams = params.sortingParams || { columnsSort: [] };

    const handleSortChange = (columnId: string) => {
        const columnsSort = sortingParams.columnsSort;

        const existingSort = columnsSort.find(sort => sort.sortColumn === columnId);

        if (existingSort) {
            if (existingSort.descending) {
                const newSorting = columnsSort.filter(sort => sort.sortColumn !== columnId);
                setParams({
                    sortingParams: { columnsSort: newSorting },
                });
            } else {
                const newSorting = columnsSort.map(sort =>
                    sort.sortColumn === columnId
                        ? { sortColumn: columnId, descending: true }
                        : sort
                );
                setParams({
                    sortingParams: { columnsSort: newSorting },
                });
            }
        } else {
            if (columnsSort.length >= 2) return;

            const newSorting = [...columnsSort, { sortColumn: columnId, descending: false }];
            setParams({
                sortingParams: { columnsSort: newSorting },
            });
        }
    };

    return {
        handleSortChange,
        sortingParams
    }
}
import { usePagedParams } from "./routeHooks";

export const usePagination = () => {


    const [params, setParams] = usePagedParams()

    const paginationParams = params.paginationParams;

    const handleUpdatePageNumber = (page: number) => {
        setParams({
            paginationParams: { ...paginationParams, pageNumber: page },
        });
    };

    const handleUpdatePageSize = (page: number) => {
        setParams({
            paginationParams: { pageNumber: 1, pageSize: page },
        });
    };

    return {
        handleUpdatePageNumber,
        handleUpdatePageSize,
        paginationParams
    }
}
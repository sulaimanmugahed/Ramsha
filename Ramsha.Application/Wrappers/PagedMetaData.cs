using Ramsha.Domain.Products;

namespace Ramsha.Application.Wrappers
{
    public class PagedMetaData
    {
        public PagedMetaData(int pageNumber, int pageSize, int totalCount, int totalPages)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalCount = totalCount;
            TotalPages = totalPages;
        }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public int TotalCount { get; set; }
        public string? GlobalFilterValue { get; set; }
        public List<ColumnFilter>? ColumnsFilter { get; set; }
        public List<CategoryId>? Categories { get; set; }
        public List<ColumnSort> ColumnsSort { get; set; } = [];

        public static PagedMetaData Create(PaginationParams paginationParams, int totalCount)
        {
            var totalPage = (int)Math.Ceiling(totalCount / (double)paginationParams.PageSize);
            return new(
            paginationParams.PageNumber,
            paginationParams.PageSize,
            totalCount,
            totalPage
           );
        }

        public void SetSorting(SortingParams sorting)
        {
            ColumnsSort = sorting.ColumnsSort;
        }

        public void SetFilter(FilterParams filter)
        {
            ColumnsFilter = filter.ColumnsFilter;
            GlobalFilterValue = filter.GlobalFilterValue;
            Categories = filter.Categories;
        }
    }
}
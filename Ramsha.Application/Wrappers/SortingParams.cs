namespace Ramsha.Application.Wrappers;

public record ColumnSort(
    string SortColumn,
    bool Descending
);

public record SortingParams(
List<ColumnSort> ColumnsSort
);

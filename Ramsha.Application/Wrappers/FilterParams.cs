

using Ramsha.Domain.Products;

namespace Ramsha.Application.Wrappers;



public enum ComparisonOperator
{
    Equals,
    NotEquals,
    GreaterThan,
    LessThan,
    GreaterThanOrEqual,
    LessThanOrEqual,
    Between,
    Contains
}

public record ColumnFilter(
   string FilterColumn,
   string Value,
   string? ValueTo,
   ComparisonOperator Operation
);

public record FilterParams(
List<ColumnFilter>? ColumnsFilter,
List<CategoryId>? Categories,
string? GlobalFilterValue
);


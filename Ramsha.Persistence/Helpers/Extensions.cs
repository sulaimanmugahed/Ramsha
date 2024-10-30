using System.Linq.Expressions;
using System.Reflection;
using System.Linq.Dynamic.Core;
using Ramsha.Application.Wrappers;

namespace Ramsha.Persistence.Helpers;


public static class Extensions
{
    public static IQueryable<T> OrderByColumnName<T>(this IQueryable<T> source, List<ColumnSort>? columnsSort = null)
    {
        if (source == null) throw new ArgumentNullException(nameof(source));
        if (columnsSort == null || columnsSort.Count == 0) return source;

        var entityType = typeof(T);


        var parameter = Expression.Parameter(entityType, "x");


        var orderByExpression = CreateOrderByExpression(entityType, parameter, columnsSort[0]);
        var methodCall = Expression.Call(
            typeof(Queryable),
            columnsSort[0].Descending ? "OrderByDescending" : "OrderBy",
            new Type[] { entityType, orderByExpression.Body.Type },
            source.Expression,
            orderByExpression);

        var result = source.Provider.CreateQuery<T>(methodCall);


        for (int i = 1; i < columnsSort.Count; i++)
        {
            var column = columnsSort[i];
            var subsequentOrderByExpression = CreateOrderByExpression(entityType, parameter, column);

            methodCall = Expression.Call(
                typeof(Queryable),
                column.Descending ? "ThenByDescending" : "ThenBy",
                new Type[] { entityType, subsequentOrderByExpression.Body.Type },
                result.Expression,
                subsequentOrderByExpression);

            result = result.Provider.CreateQuery<T>(methodCall);
        }

        return result;
    }

    private static LambdaExpression CreateOrderByExpression(Type entityType, ParameterExpression parameter, ColumnSort column)
    {

        string[] propertyNames = column.SortColumn.Split('.');
        Expression propertyAccess = parameter;
        Type currentType = entityType;


        foreach (var propertyName in propertyNames)
        {
            var property = currentType.GetProperty(propertyName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
            if (property == null)
                throw new ArgumentException($"Property '{propertyName}' not found on type '{currentType.Name}'", nameof(column.SortColumn));

            propertyAccess = Expression.MakeMemberAccess(propertyAccess, property);
            currentType = property.PropertyType;
        }

        return Expression.Lambda(propertyAccess, parameter);
    }


    public static IQueryable<T> FilterByColumn<T>(this IQueryable<T> query, List<ColumnFilter> columnsFilter)
    {
        if (query == null) throw new ArgumentNullException(nameof(query));
        if (columnsFilter == null || columnsFilter.Count == 0) return query;

        var parameter = Expression.Parameter(typeof(T), "x");
        Expression? predicate = null;

        foreach (var column in columnsFilter)
        {
            var property = GetPropertyExpression<T>(parameter, column.FilterColumn);

            var comparison = BuildComparisonExpression(property, column);

            predicate = predicate == null ? comparison : Expression.AndAlso(predicate, comparison);
        }

        if (predicate == null)
        {
            return query;
        }

        var lambda = Expression.Lambda<Func<T, bool>>(predicate, parameter);
        return query.Where(lambda);
    }

    private static Expression GetPropertyExpression<T>(Expression parameter, string columnName)
    {
        string[] propertyNames = columnName.Split('.');
        Expression propertyExpression = parameter;
        Type currentType = typeof(T);

        foreach (var propertyName in propertyNames)
        {
            var property = currentType.GetProperty(propertyName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
            if (property == null)
            {
                throw new ArgumentException($"Property '{propertyName}' not found on type '{currentType.Name}'.");
            }

            propertyExpression = Expression.Property(propertyExpression, property);

            currentType = property.PropertyType;
        }

        return propertyExpression;
    }



    private static Expression BuildComparisonExpression(Expression propertyExpression, ColumnFilter column)
    {
        if (column.Value == null)
        {
            return Expression.Equal(propertyExpression, Expression.Constant(null, propertyExpression.Type));
        }

        var operation = column.Operation;

        return propertyExpression.Type switch
        {
            Type stringType when stringType == typeof(string) => HandleStringComparison(propertyExpression, column, operation),
            Type enumType when enumType.IsEnum => HandleEnumComparison(propertyExpression, column, enumType),
            Type dateType when dateType == typeof(DateTime) || dateType == typeof(DateTime?) => HandleDateComparison(propertyExpression, column.Value, column.ValueTo, operation, dateType),
            Type numericType when IsNumericType(numericType) => HandleNumericComparison(propertyExpression, column, operation, numericType),
            _ => throw new NotSupportedException($"Unsupported property type '{propertyExpression.Type}'.")
        };
    }


    private static Expression HandleStringComparison(Expression propertyExpression, ColumnFilter column, ComparisonOperator operation)
    {
        var value = column.Value?.ToString()?.ToLower() ?? string.Empty;
        var toLowerMethod = typeof(string).GetMethod("ToLower", Type.EmptyTypes);
        var containsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });

        var propertyToLower = Expression.Call(propertyExpression, toLowerMethod);
        var filterValue = Expression.Constant(value);

        return operation switch
        {
            ComparisonOperator.Equals => Expression.Equal(propertyToLower, filterValue),
            ComparisonOperator.Contains => Expression.Call(propertyToLower, containsMethod, filterValue),
            _ => Expression.Call(propertyToLower, containsMethod, filterValue)
        };
    }

    private static BinaryExpression HandleEnumComparison(Expression propertyExpression, ColumnFilter column, Type enumType)
    {
        if (!Enum.TryParse(enumType, column.Value.ToString(), true, out var enumValue))
        {
            throw new ArgumentException($"Invalid enum value '{column.Value}' for enum type '{enumType}'");
        }

        return Expression.Equal(propertyExpression, Expression.Constant(enumValue, enumType));
    }

    private static BinaryExpression HandleDateComparison(Expression propertyExpression, string value, string valueTo, ComparisonOperator operation, Type propertyType)
    {
        var dateValue = Convert.ToDateTime(value);
        var dateValueExpression = Expression.Constant(dateValue, propertyType);

        return operation switch
        {
            ComparisonOperator.Between when valueTo != null =>
                Expression.AndAlso(
                    Expression.GreaterThanOrEqual(propertyExpression, dateValueExpression),
                    Expression.LessThanOrEqual(propertyExpression, Expression.Constant(Convert.ToDateTime(valueTo), propertyType))
                ),
            ComparisonOperator.GreaterThan => Expression.GreaterThan(propertyExpression, dateValueExpression),
            ComparisonOperator.LessThan => Expression.LessThan(propertyExpression, dateValueExpression),
            ComparisonOperator.Equals => Expression.Equal(propertyExpression, dateValueExpression),
            _ => Expression.Equal(propertyExpression, dateValueExpression)
        };
    }

    private static BinaryExpression HandleNumericComparison(Expression propertyExpression, ColumnFilter column, ComparisonOperator @operator, Type propertyType)
    {
        var numericValue = Convert.ChangeType(column.Value, propertyType);
        var numericExpression = Expression.Constant(numericValue, propertyType);

        return @operator switch
        {
            ComparisonOperator.Equals => Expression.Equal(propertyExpression, numericExpression),
            ComparisonOperator.GreaterThan => Expression.GreaterThan(propertyExpression, numericExpression),
            ComparisonOperator.LessThan => Expression.LessThan(propertyExpression, numericExpression),
            ComparisonOperator.Between when column.ValueTo != null =>
                Expression.AndAlso(
                    Expression.GreaterThanOrEqual(propertyExpression, numericExpression),
                    Expression.LessThanOrEqual(propertyExpression, Expression.Constant(Convert.ChangeType(column.ValueTo, propertyType), propertyType))
                ),
            _ => throw new NotSupportedException($"Operation {@operator} is not supported for numeric comparison.")
        };

    }

    private static bool IsNumericType(Type type)
    {
        return type == typeof(int) || type == typeof(decimal) || type == typeof(double) || type == typeof(float) ||
               type == typeof(long) || type == typeof(short) || type == typeof(byte) ||
               type == typeof(int?) || type == typeof(decimal?) || type == typeof(double?) || type == typeof(float?) ||
               type == typeof(long?) || type == typeof(short?) || type == typeof(byte?);
    }

}
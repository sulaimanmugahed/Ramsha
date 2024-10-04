

using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text.Json;
using System.Linq.Dynamic.Core;
using Ramsha.Application.Wrappers;

namespace Ramsha.Persistence.Helpers;


public static class Extensions
{
    public static IQueryable<T> OrderByColumnName<T>(this IQueryable<T> source, List<ColumnSort>? columnsSort = null)
    {
        if (source == null) throw new ArgumentNullException(nameof(source));
        if (columnsSort == null || columnsSort.Count == 0) return source;

        // Get the type of the entity
        var entityType = typeof(T);

        // Create the parameter expression (e.g., x => x)
        var parameter = Expression.Parameter(entityType, "x");

        // Initialize the ordering expression with the first column
        var orderByExpression = CreateOrderByExpression(entityType, parameter, columnsSort[0]);
        var methodCall = Expression.Call(
            typeof(Queryable),
            columnsSort[0].Descending ? "OrderByDescending" : "OrderBy",
            new Type[] { entityType, orderByExpression.Body.Type },
            source.Expression,
            orderByExpression);

        var result = source.Provider.CreateQuery<T>(methodCall);

        // Apply subsequent columns using ThenBy or ThenByDescending
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
    // Split the SortColumn by dots to support nested properties
    string[] propertyNames = column.SortColumn.Split('.');
    Expression propertyAccess = parameter;
    Type currentType = entityType;

    // Loop through each part of the nested property (e.g., brand -> name)
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


    // private static LambdaExpression CreateOrderByExpression(Type entityType, ParameterExpression parameter, ColumnSort column)
    // {
    //     // Get the property info for the column to sort by
    //     var property = entityType.GetProperty(column.SortColumn, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
    //     if (property == null)
    //         throw new ArgumentException($"Property '{column.SortColumn}' not found on type '{entityType.Name}'", nameof(column.SortColumn));

    //     // Create the property access expression
    //     var propertyAccess = Expression.MakeMemberAccess(parameter, property);
    //     return Expression.Lambda(propertyAccess, parameter);
    // }



    // public static IQueryable<T> FilterByColumn<T>(this IQueryable<T> query, List<ColumnFilter> columnsFilter)
    // {
    //     ArgumentNullException.ThrowIfNull(query);
    //     if (columnsFilter == null || columnsFilter.Count == 0) return query;

    //     var parameter = Expression.Parameter(typeof(T), "x");
    //     Expression predicate = Expression.Constant(true);

    //     foreach (var column in columnsFilter)
    //     {
    //         var columnName = column.FilterColumn;
    //         var value = column.Value;
    //         var property = typeof(T).GetProperty(columnName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);

    //         if (property == null)
    //         {
    //             throw new ArgumentException($"Property '{columnName}' not found on type '{typeof(T)}'.");
    //         }

    //         var propertyExpression = Expression.Property(parameter, property);
    //         Expression comparison = null;

    //         if (value == null)
    //         {
    //             comparison = Expression.Equal(propertyExpression, Expression.Constant(null, property.PropertyType));
    //         }
    //         else
    //         {
    //             var convertedValue = ConvertValue(value, property.PropertyType);
    //             var valueExpression = Expression.Constant(convertedValue, property.PropertyType);
    //             comparison = Expression.Equal(propertyExpression, valueExpression);
    //         }

    //         predicate = Expression.AndAlso(predicate, comparison);
    //     }

    //     var lambda = Expression.Lambda<Func<T, bool>>(predicate, parameter);
    //     return query.Where(lambda);

    // }

    public static IQueryable<T> FilterByColumn<T>(this IQueryable<T> query, List<ColumnFilter> columnsFilter)
    {
        if (query == null) throw new ArgumentNullException(nameof(query));
        if (columnsFilter == null || columnsFilter.Count == 0) return query;

        var parameter = Expression.Parameter(typeof(T), "x");
        Expression? predicate = null;  // Start with null, and build up

        foreach (var column in columnsFilter)
        {
            // Get the property expression for the column
            var property = GetPropertyExpression<T>(parameter, column.FilterColumn);

            // Build the comparison expression based on the column filter (returns BinaryExpression)
            var comparison = BuildComparisonExpression(property, column);

            // Combine the comparison with the existing predicate using AndAlso (if predicate exists)
            predicate = predicate == null ? comparison : Expression.AndAlso(predicate, comparison);
        }

        // If no predicate was built, return the original query unmodified
        if (predicate == null)
        {
            return query;
        }

        // Create the lambda expression and apply the predicate to the query
        var lambda = Expression.Lambda<Func<T, bool>>(predicate, parameter);
        return query.Where(lambda);
    }

    private static Expression GetPropertyExpression<T>(Expression parameter, string columnName)
    {
        string[] propertyNames = columnName.Split('.'); // Split on dot to support nested properties
        Expression propertyExpression = parameter;
        Type currentType = typeof(T); // Keep track of the current type as we navigate

        foreach (var propertyName in propertyNames)
        {
            // Get the property from the current type (starts with T, then follows nested properties)
            var property = currentType.GetProperty(propertyName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
            if (property == null)
            {
                throw new ArgumentException($"Property '{propertyName}' not found on type '{currentType.Name}'.");
            }

            // Update the expression to access this property
            propertyExpression = Expression.Property(propertyExpression, property);

            // Update currentType to the property type, for the next iteration (to handle nested properties)
            currentType = property.PropertyType;
        }

        return propertyExpression;
    }



    // private static Expression GetPropertyExpression<T>(Expression parameter, string columnName)
    // {
    //     string[] propertyNames = columnName.Split('.'); // Split on dot to support nested properties
    //     Expression propertyExpression = parameter;

    //     foreach (var propertyName in propertyNames)
    //     {
    //         var property = typeof(T).GetProperty(propertyName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
    //         if (property == null)
    //         {
    //             throw new ArgumentException($"Property '{columnName}' not found on type '{typeof(T)}'.");
    //         }
    //         propertyExpression = Expression.Property(propertyExpression, property);
    //     }

    //     return propertyExpression;
    // }


    private static Expression BuildComparisonExpression(Expression propertyExpression, ColumnFilter column)
    {
        if (column.Value == null)
        {
            return Expression.Equal(propertyExpression, Expression.Constant(null, propertyExpression.Type));
        }

        var operation = column.Operation;

        // Delegate to specialized methods based on the property type
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
            _ => Expression.Call(propertyToLower, containsMethod, filterValue) // Default to 'contains'
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


    // public static IQueryable<T> FilterByColumn<T>(this IQueryable<T> query, List<ColumnFilter> columnsFilter)
    // {
    //     if (query == null) throw new ArgumentNullException(nameof(query));
    //     if (columnsFilter == null || columnsFilter.Count == 0) return query;

    //     var parameter = Expression.Parameter(typeof(T), "x");
    //     Expression predicate = Expression.Constant(true);

    //     foreach (var column in columnsFilter)
    //     {
    //         var columnName = column.FilterColumn;
    //         var value = column.Value;
    //         var property = typeof(T).GetProperty(columnName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);

    //         if (property == null)
    //         {
    //             throw new ArgumentException($"Property '{columnName}' not found on type '{typeof(T)}'.");
    //         }

    //         var propertyExpression = Expression.Property(parameter, property);
    //         Expression comparison = null;

    //         if (value == null)
    //         {
    //             comparison = Expression.Equal(propertyExpression, Expression.Constant(null, property.PropertyType));
    //         }
    //         else
    //         {
    //             var valueString = value.ToString();
    //             if (property.PropertyType == typeof(string))
    //             {
    //                 var toLowerMethod = typeof(string).GetMethod("ToLower", Type.EmptyTypes);
    //                 var containsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });
    //                 var propertyToLowerExpression = Expression.Call(propertyExpression, toLowerMethod);
    //                 var filterToLowerExpression = Expression.Call(Expression.Constant(valueString, typeof(string)), toLowerMethod);
    //                 comparison = Expression.Call(propertyToLowerExpression, containsMethod, filterToLowerExpression);
    //             }
    //             else if (property.PropertyType.IsEnum)
    //             {
    //                 var enumValue = Enum.Parse(property.PropertyType, valueString);
    //                 var enumValueExpression = Expression.Constant(enumValue, property.PropertyType);
    //                 comparison = Expression.Equal(propertyExpression, enumValueExpression);
    //             }
    //             else if (property.PropertyType == typeof(DateTime) || property.PropertyType == typeof(DateTime?))
    //             {
    //                 var dateValue = Convert.ToDateTime(value);
    //                 var dateValueExpression = Expression.Constant(dateValue, property.PropertyType);
    //                 comparison = Expression.Equal(propertyExpression, dateValueExpression);
    //             }
    //             else if (IsNumericType(property.PropertyType))
    //             {
    //                 var numericValue = Convert.ChangeType(value, property.PropertyType);
    //                 var numericValueExpression = Expression.Constant(numericValue, property.PropertyType);
    //                 comparison = Expression.Equal(propertyExpression, numericValueExpression);
    //             }
    //             else
    //             {
    //                 var propertyToStringExpression = Expression.Call(propertyExpression, typeof(object).GetMethod("ToString"));
    //                 var toLowerMethod = typeof(string).GetMethod("ToLower", Type.EmptyTypes);
    //                 var filterToLowerExpression = Expression.Call(Expression.Constant(valueString, typeof(string)), toLowerMethod);
    //                 var propertyToLowerExpression = Expression.Call(propertyToStringExpression, toLowerMethod);
    //                 var containsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });
    //                 comparison = Expression.Call(propertyToLowerExpression, containsMethod, filterToLowerExpression);
    //             }
    //         }

    //         predicate = Expression.AndAlso(predicate, comparison);
    //     }

    //     var lambda = Expression.Lambda<Func<T, bool>>(predicate, parameter);
    //     return query.Where(lambda);
    // }

    // private static bool IsNumericType(Type type)
    // {
    //     return type == typeof(byte) || type == typeof(sbyte) ||
    //            type == typeof(short) || type == typeof(ushort) ||
    //            type == typeof(int) || type == typeof(uint) ||
    //            type == typeof(long) || type == typeof(ulong) ||
    //            type == typeof(float) || type == typeof(double) ||
    //            type == typeof(decimal);
    // }



    // private static object ConvertValue(string value, Type targetType)
    // {

    //     if (targetType.IsEnum)
    //     {
    //         return Enum.Parse(targetType, value.ToString());
    //     }

    //     if (targetType == typeof(Guid))
    //     {
    //         return Guid.Parse(value.ToString());
    //     }

    //     if (targetType == typeof(DateTime))
    //     {
    //         return DateTime.Parse(value.ToString());
    //     }

    //     if (targetType == typeof(decimal) || targetType == typeof(double) || targetType == typeof(float))
    //     {
    //         return Convert.ToDouble(value); // handle floating-point numbers
    //     }

    //     if (targetType == typeof(int) || targetType == typeof(long) || targetType == typeof(short))
    //     {
    //         return Convert.ToInt64(value); // handle integer numbers
    //     }

    //     if (targetType == typeof(bool))
    //     {
    //         return Convert.ToBoolean(value);
    //     }

    //     // For other types, return as is if already matching
    //     if (value.GetType() == targetType)
    //     {
    //         return value;
    //     }

    //     throw new InvalidCastException($"Cannot convert value of type '{value.GetType()}' to '{targetType}'.");
    // }

    // private static object ConvertJsonElement(JsonElement jsonElement, Type targetType)
    // {
    //     // Handle conversion based on targetType

    //     if (targetType == typeof(decimal))
    //     {
    //         return jsonElement.GetDecimal();
    //     }

    //     if (targetType == typeof(string))
    //     {
    //         return jsonElement.GetString();
    //     }

    //     if (targetType == typeof(int))
    //     {
    //         return jsonElement.GetInt32();
    //     }

    //     if (targetType == typeof(long))
    //     {
    //         return jsonElement.GetInt64();
    //     }

    //     if (targetType == typeof(float))
    //     {
    //         return jsonElement.GetSingle();
    //     }

    //     if (targetType == typeof(double))
    //     {
    //         return jsonElement.GetDouble();
    //     }



    //     if (targetType == typeof(bool))
    //     {
    //         return jsonElement.GetBoolean();
    //     }

    //     if (targetType == typeof(DateTime))
    //     {
    //         return DateTime.Parse(jsonElement.GetString());
    //     }

    //     if (targetType == typeof(Guid))
    //     {
    //         return Guid.Parse(jsonElement.GetString());
    //     }

    //     // Handle other types or throw an exception if not supported
    //     throw new InvalidCastException($"Cannot convert JsonElement to '{targetType}'.");
    // }




    // public static IQueryable<T> OrderByColumnName<T>(this IQueryable<T> source, string columnName, bool descending)
    // {
    //     if (string.IsNullOrEmpty(columnName))
    //         return source;

    //     return source.OrderBy(descending ? $"{columnName} desc" : columnName);
    // }
}




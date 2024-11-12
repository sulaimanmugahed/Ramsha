using System.Linq.Expressions;
using System.Reflection;
using System.Linq.Dynamic.Core;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Common;

namespace Ramsha.Persistence.Helpers
{
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
                var comparison = CreateFilterExpression<T>(parameter, column);
                predicate = predicate == null ? comparison : Expression.AndAlso(predicate, comparison);
            }

            if (predicate == null)
            {
                return query;
            }

            var lambda = Expression.Lambda<Func<T, bool>>(predicate, parameter);
            return query.Where(lambda);
            
        }

        private static Expression CreateFilterExpression<T>(Expression parameter, ColumnFilter column)
        {
            string[] propertyNames = column.FilterColumn.Split('.');
            Expression propertyExpression = parameter;
            Type currentType = typeof(T);


            for (int i = 0; i < propertyNames.Length; i++)
            {
                var propertyName = propertyNames[i];
                var property = currentType.GetProperty(propertyName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                if (property == null)
                    throw new ArgumentException($"Property '{propertyName}' not found on type '{currentType.Name}'.");

                // if (IsValueObjectType(property.PropertyType))
                // {
                //     continue;
                // }

                if (typeof(System.Collections.IEnumerable).IsAssignableFrom(property.PropertyType) && property.PropertyType.IsGenericType && property.PropertyType != typeof(string))
                {
                    var elementType = property.PropertyType.GetGenericArguments()[0];
                    var itemParameter = Expression.Parameter(elementType, "item");

                    var innerPropertyExpression = GetNestedPropertyExpression(itemParameter, propertyNames.Skip(i + 1).ToArray());

                    var comparison = BuildComparison(innerPropertyExpression, column);

                    var anyMethod = typeof(Enumerable).GetMethods()
                        .First(m => m.Name == "Any" && m.GetParameters().Length == 2)
                        .MakeGenericMethod(elementType);

                    return Expression.Call(anyMethod, Expression.Property(propertyExpression, property), Expression.Lambda(comparison, itemParameter));
                }
                else
                {
                    propertyExpression = Expression.Property(propertyExpression, property);
                    currentType = property.PropertyType;
                }
            }

            // var filterValue = ConvertFilterValue(propertyExpression.Type, column.Value);
            return BuildComparison(propertyExpression, column);
        }

        private static Expression GetNestedPropertyExpression(Expression parameter, string[] propertyNames)
        {
            Expression propertyExpression = parameter;
            Type currentType = parameter.Type;

            foreach (var propertyName in propertyNames)
            {
                var property = currentType.GetProperty(propertyName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                if (property == null)
                    throw new ArgumentException($"Property '{propertyName}' not found on type '{currentType.Name}'.");

                propertyExpression = Expression.Property(propertyExpression, property);
                currentType = property.PropertyType;
            }

            return propertyExpression;
        }

        private static Expression BuildComparison(Expression propertyExpression, ColumnFilter column)
        {
            return propertyExpression.Type switch
            {
                Type stringType when stringType == typeof(string) => HandleStringComparison(propertyExpression, column),
                Type enumType when enumType.IsEnum => HandleEnumComparison(propertyExpression, column, enumType),
                Type dateType when dateType == typeof(DateTime) || dateType == typeof(DateTime?) => HandleDateComparison(propertyExpression, column, dateType),
                Type numericType when IsNumericType(numericType) => HandleNumericComparison(propertyExpression, column, numericType),
                Type guidType when guidType == typeof(Guid) => HandleGuidComparison(propertyExpression, column),
                _ => throw new NotSupportedException($"Unsupported property type '{propertyExpression.Type}'.")
            };
        }

        private static Expression HandleStringComparison(Expression propertyExpression, ColumnFilter column)
        {
            var value = column.Value?.ToString()?.ToLower() ?? string.Empty;
            var toLowerMethod = typeof(string).GetMethod("ToLower", Type.EmptyTypes);
            var containsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });

            var propertyToLower = Expression.Call(propertyExpression, toLowerMethod);
            var filterValue = Expression.Constant(value);

            return column.Operation switch
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

        private static BinaryExpression HandleGuidComparison(Expression propertyExpression, ColumnFilter column)
        {
            var filterValue = ConvertFilterValue(propertyExpression.Type, column.Value);
            return column.Operation switch
            {
                ComparisonOperator.Equals => Expression.Equal(propertyExpression, filterValue),
                ComparisonOperator.GreaterThan => Expression.GreaterThan(propertyExpression, filterValue),
                ComparisonOperator.LessThan => Expression.LessThan(propertyExpression, filterValue),
                _ => throw new NotSupportedException($"Operation {column.Operation} is not supported for Guid comparison.")
            };
        }

        private static BinaryExpression HandleDateComparison(Expression propertyExpression, ColumnFilter column, Type propertyType)
        {
            var dateValue = Convert.ToDateTime(column.Value);
            var dateValueExpression = Expression.Constant(dateValue, propertyType);

            return column.Operation switch
            {
                ComparisonOperator.Between when column.ValueTo != null =>
                    Expression.AndAlso(
                        Expression.GreaterThanOrEqual(propertyExpression, dateValueExpression),
                        Expression.LessThanOrEqual(propertyExpression, Expression.Constant(Convert.ToDateTime(column.ValueTo), propertyType))
                    ),
                ComparisonOperator.GreaterThan => Expression.GreaterThan(propertyExpression, dateValueExpression),
                ComparisonOperator.LessThan => Expression.LessThan(propertyExpression, dateValueExpression),
                ComparisonOperator.Equals => Expression.Equal(propertyExpression, dateValueExpression),
                _ => Expression.Equal(propertyExpression, dateValueExpression)
            };
        }

        private static BinaryExpression HandleNumericComparison(Expression propertyExpression, ColumnFilter column, Type propertyType)
        {
            var numericExpression = ConvertFilterValue(propertyType, column.Value);

            return column.Operation switch
            {
                ComparisonOperator.Equals => Expression.Equal(propertyExpression, numericExpression),
                ComparisonOperator.GreaterThan => Expression.GreaterThan(propertyExpression, numericExpression),
                ComparisonOperator.LessThan => Expression.LessThan(propertyExpression, numericExpression),
                ComparisonOperator.Between when column.ValueTo != null =>
                    Expression.AndAlso(
                        Expression.GreaterThanOrEqual(propertyExpression, numericExpression),
                        Expression.LessThanOrEqual(propertyExpression, Expression.Constant(Convert.ChangeType(column.ValueTo, propertyType), propertyType))
                    ),
                _ => throw new NotSupportedException($"Operation {column.Operation} is not supported for numeric comparison.")
            };

        }

        private static Expression ConvertFilterValue(Type targetType, object? value)
        {
            if (value == null)
            {
                // Return a null constant for the target type (works for nullable types too)
                return Expression.Constant(null, targetType);
            }

            // Handle nullable types correctly
            var nonNullableType = Nullable.GetUnderlyingType(targetType) ?? targetType;

            if (nonNullableType == typeof(Guid) && value is string strValue)
            {
                // Convert from string to Guid
                if (Guid.TryParse(strValue, out Guid result))
                {
                    return Expression.Constant(result, targetType);
                }
                else
                {
                    throw new ArgumentException($"Invalid Guid format: '{strValue}'", nameof(value));
                }
            }

            // Default conversion for other types
            return Expression.Constant(Convert.ChangeType(value, nonNullableType), targetType);
        }



        private static bool IsNumericType(Type type)
        {
            return new[] { typeof(int), typeof(decimal), typeof(double), typeof(float), typeof(long), typeof(short), typeof(byte) }.Contains(type) ||
                   Nullable.GetUnderlyingType(type) is { } underlyingType && IsNumericType(underlyingType);
        }

        private static bool IsValueObjectType(Type type)
        {
            return typeof(ValueObject).IsAssignableFrom(type);
        }
    }
}

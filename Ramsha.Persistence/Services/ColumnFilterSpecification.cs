using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Ramsha.Application.Wrappers;

namespace Ramsha.Persistence.Services;

public class ColumnFilterSpecification<T> : Specification<T>
{
    private readonly Dictionary<string, (object Value, ComparisonOperator Operator)> _columnFilters;
    private readonly Dictionary<string, (object MinValue, object MaxValue)> _rangeFilters;

    public ColumnFilterSpecification(
        Dictionary<string, (object Value, ComparisonOperator Operator)> columnFilters,
        Dictionary<string, (object MinValue, object MaxValue)>? rangeFilters = null)
    {
        _columnFilters = columnFilters;
        _rangeFilters = rangeFilters ?? new Dictionary<string, (object MinValue, object MaxValue)>();
    }

    public override Expression<Func<T, bool>> ToExpression()
    {
        var parameter = Expression.Parameter(typeof(T), "p");
        Expression? finalExpression = null;

        // Handle single-value comparisons (e.g., Equals, Contains, GreaterThan, etc.)
        foreach (var filter in _columnFilters)
        {
            var property = Expression.Property(parameter, filter.Key);
            var constant = Expression.Constant(filter.Value.Value);
            Expression comparisonExpression = GetComparisonExpression(property, constant, filter.Value.Operator);

            finalExpression = finalExpression == null
                ? comparisonExpression
                : Expression.AndAlso(finalExpression, comparisonExpression);
        }

        // Handle range filters (e.g., Between, NotBetween)
        foreach (var filter in _rangeFilters)
        {
            var property = Expression.Property(parameter, filter.Key);
            var minValue = Expression.Constant(filter.Value.MinValue);
            var maxValue = Expression.Constant(filter.Value.MaxValue);

            var rangeExpression = Expression.AndAlso(
                Expression.GreaterThanOrEqual(property, minValue),
                Expression.LessThanOrEqual(property, maxValue)
            );

            finalExpression = finalExpression == null
                ? rangeExpression
                : Expression.AndAlso(finalExpression, rangeExpression);
        }

        return finalExpression != null
            ? Expression.Lambda<Func<T, bool>>(finalExpression, parameter)
            : Expression.Lambda<Func<T, bool>>(Expression.Constant(true), parameter);
    }

    private Expression GetComparisonExpression(MemberExpression property, ConstantExpression constant, ComparisonOperator comparisonOperator)
    {
        return comparisonOperator switch
        {
            ComparisonOperator.Equals => Expression.Equal(property, constant),
            ComparisonOperator.NotEquals => Expression.NotEqual(property, constant),
            ComparisonOperator.GreaterThan => Expression.GreaterThan(property, constant),
            ComparisonOperator.LessThan => Expression.LessThan(property, constant),
            ComparisonOperator.GreaterThanOrEqual => Expression.GreaterThanOrEqual(property, constant),
            ComparisonOperator.LessThanOrEqual => Expression.LessThanOrEqual(property, constant),
            _ =>  Expression.Call(property, typeof(string).GetMethod("Contains", new[] { typeof(string) }), constant)
        };
    }
}

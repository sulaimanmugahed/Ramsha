using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Ramsha.Application.Wrappers;
using Ramsha.Persistence.Helpers;

namespace Ramsha.Persistence.Services;

public class PropertySpecification<T> : Specification<T>
{
    private readonly string _propertyName;
    private readonly object _value;
    private readonly ComparisonOperator _operator;

    public PropertySpecification(string propertyName, object value, ComparisonOperator comparisonOperator)
    {
        _propertyName = propertyName;
        _value = value;
        _operator = comparisonOperator;
    }

    public override Expression<Func<T, bool>> ToExpression()
    {
        var parameter = Expression.Parameter(typeof(T), "p");
        var property = Expression.Property(parameter, _propertyName);
        var constant = Expression.Constant(_value);

        Expression comparison = _operator switch
        {
            ComparisonOperator.Equals => Expression.Equal(property, constant),
            ComparisonOperator.NotEquals => Expression.NotEqual(property, constant),
            ComparisonOperator.GreaterThan => Expression.GreaterThan(property, constant),
            ComparisonOperator.LessThan => Expression.LessThan(property, constant),
            ComparisonOperator.GreaterThanOrEqual => Expression.GreaterThanOrEqual(property, constant),
            ComparisonOperator.LessThanOrEqual => Expression.LessThanOrEqual(property, constant),
            _ => throw new NotSupportedException($"Operator {_operator} is not supported.")
        };

        return Expression.Lambda<Func<T, bool>>(comparison, parameter);
    }
}

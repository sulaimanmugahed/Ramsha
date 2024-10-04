using System.Linq.Expressions;

namespace Ramsha.Persistence.Services;



public class RangeSpecification<T, TProperty> : Specification<T> where TProperty : IComparable<TProperty>
{
    private readonly string _propertyName;
    private readonly TProperty? _minValue;
    private readonly TProperty? _maxValue;

    public RangeSpecification(string propertyName, TProperty? minValue = default, TProperty? maxValue = default)
    {
        _propertyName = propertyName;
        _minValue = minValue;
        _maxValue = maxValue;
    }

    public override Expression<Func<T, bool>> ToExpression()
    {
        var parameter = Expression.Parameter(typeof(T), "p");
        var property = Expression.Property(parameter, _propertyName);

        Expression rangeCheck = Expression.Constant(true);

        if (_minValue != null)
        {
            var minExpression = Expression.GreaterThanOrEqual(property, Expression.Constant(_minValue));
            rangeCheck = Expression.AndAlso(rangeCheck, minExpression);
        }

        if (_maxValue != null)
        {
            var maxExpression = Expression.LessThanOrEqual(property, Expression.Constant(_maxValue));
            rangeCheck = Expression.AndAlso(rangeCheck, maxExpression);
        }

        return Expression.Lambda<Func<T, bool>>(rangeCheck, parameter);
    }
}

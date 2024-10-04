using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Persistence.Services;

public interface IFilterContext
{
    IEnumerable<T> ApplySpecification<T>(IEnumerable<T> items, Specification<T> spec);
}

public class FilterContext : IFilterContext
{
    public IEnumerable<T> ApplySpecification<T>(IEnumerable<T> items, Specification<T> spec)
    {
        var predicate = spec.ToExpression();
        return items.AsQueryable().Where(predicate).ToList();
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Ramsha.Persistence.Services;

public abstract class Specification<T>
{
    public abstract Expression<Func<T, bool>> ToExpression();
}


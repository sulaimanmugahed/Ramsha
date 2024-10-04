using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Application.Contracts.Persistence;

public interface ISupplyRepository : IGenericRepository<Supply, SupplyId>
{
    Task<IEnumerable<Supply>> FindAllWithDetail(Expression<Func<Supply, bool>> criteria);
    Task<Supply?> GetWithDetails(Expression<Func<Supply, bool>> criteria);

}

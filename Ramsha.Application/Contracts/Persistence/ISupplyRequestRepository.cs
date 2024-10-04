using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Application.Contracts.Persistence;

public interface ISupplyRequestRepository : IGenericRepository<SupplyRequest, SupplyRequestId>
{
    Task<IEnumerable<SupplyRequest>> FindAllWithDetail(Expression<Func<SupplyRequest, bool>> criteria);
    Task<SupplyRequest?> GetWithDetails(Expression<Func<SupplyRequest, bool>> criteria);

}

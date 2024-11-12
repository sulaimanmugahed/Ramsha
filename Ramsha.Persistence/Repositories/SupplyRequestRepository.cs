
using System.Linq.Expressions;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;
using Ramsha.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Ramsha.Persistence.Repositories;

public class SupplyRequestRepository(ApplicationDbContext context)
: GenericRepository<SupplyRequest, SupplyRequestId>(context),
ISupplyRequestRepository
{
    private DbSet<SupplyRequest> _requests = context.Set<SupplyRequest>();
    public async Task<IEnumerable<SupplyRequest>> FindAllWithDetail(Expression<Func<SupplyRequest, bool>> criteria)
    {
        return await _requests.Where(criteria).Include(r => r.Items).ToListAsync();
    }

    public async Task<SupplyRequest?> GetWithDetails(Expression<Func<SupplyRequest, bool>> criteria)
    {
        return await _requests
        .Include(r => r.Items)
        .ThenInclude(r => r.SupplierVariant)
         .Include(r => r.Items)
        .ThenInclude(r => r.Product)
        .SingleOrDefaultAsync(criteria);
    }
}

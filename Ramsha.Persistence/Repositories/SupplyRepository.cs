
using System.Linq.Expressions;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;
using Ramsha.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Ramsha.Persistence.Repositories;

public class SupplyRepository(ApplicationDbContext context) : GenericRepository<Supply, SupplyId>(context), ISupplyRepository
{
    private DbSet<Supply> _supplies = context.Set<Supply>();

    public async Task<Supply?> GetWithDetails(Expression<Func<Supply, bool>> criteria)
    {
        return await _supplies
        .Include(x => x.Supplier)
        .Include(r => r.Items)
        .ThenInclude(r => r.ItemSupplied)
        .SingleOrDefaultAsync(criteria);
    }

    public async Task<IEnumerable<Supply>> FindAllWithDetail(Expression<Func<Supply, bool>> criteria)
    {
        return await _supplies.Where(criteria).Include(r => r.Items).ToListAsync();
    }
}

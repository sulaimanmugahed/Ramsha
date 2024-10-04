using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;
using Ramsha.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;


namespace Ramsha.Persistence.Repositories;
public class SupplierRepository(ApplicationDbContext context) : GenericRepository<Supplier, SupplierId>(context), ISupplierRepository
{
	private readonly DbSet<Supplier> _suppliers = context.Set<Supplier>();
	public async Task<Supplier?> FindByUsername(string username)
	{
		return await _suppliers.Include(x => x.Supplies).FirstOrDefaultAsync(x => x.Username == username);
	}


}

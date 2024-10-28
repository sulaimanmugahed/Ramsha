using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;
using Ramsha.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.DTOs.Common;
using Ramsha.Domain.Products.Entities;
using Ramsha.Application.Wrappers;
using Ramsha.Application.Contracts;


namespace Ramsha.Persistence.Repositories;
public class SupplierRepository(ApplicationDbContext context, IAuthenticatedUserService authenticatedUserService) : GenericRepository<Supplier, SupplierId>(context), ISupplierRepository
{
	private readonly DbSet<Supplier> _suppliers = context.Set<Supplier>();
	private readonly DbSet<SupplierProduct> _supplierProducts = context.Set<SupplierProduct>();

	public async Task<Supplier?> FindByUsername(string username)
	{
		return await _suppliers.Include(x => x.Supplies).FirstOrDefaultAsync(x => x.Username == username);
	}

}

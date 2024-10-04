using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Customers;
using Ramsha.Domain.Customers.Entities;
using Ramsha.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;


namespace Ramsha.Persistence.Repositories;
public class CustomerRepository(ApplicationDbContext context) : GenericRepository<Customer, CustomerId>(context), ICustomerRepository
{
	private readonly DbSet<Customer> _customers = context.Set<Customer>();
	public async Task<Customer?> FindByUsername(string username)
	{
		return await _customers.FirstOrDefaultAsync(x => x.Username == username);
	}
}

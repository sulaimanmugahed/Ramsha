using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Customers;
using Ramsha.Domain.Customers.Entities;
using Ramsha.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Ramsha.Application.DTOs.Common;
using Ramsha.Application.Dtos.Customers;
using Ramsha.Application.Wrappers;
using System.Linq.Expressions;
using Ramsha.Persistence.Helpers;
using Ramsha.Application.Extensions;


namespace Ramsha.Persistence.Repositories;
public class CustomerRepository(ApplicationDbContext context) : GenericRepository<Customer, CustomerId>(context), ICustomerRepository
{
	private readonly DbSet<Customer> _customers = context.Set<Customer>();
	public async Task<Customer?> FindByUsername(string username)
	{
		return await _customers.FirstOrDefaultAsync(x => x.Username == username);
	}


	public async Task<PaginationResponseDto<CustomerDto>> GetPaged(PagedParams pagedParams, Expression<Func<Customer, bool>>? criteria = null)
	{
		var customersQuery = _customers
	.AsQueryable();

		var sortingParams = pagedParams.SortingParams;
		customersQuery = sortingParams is not null && sortingParams.ColumnsSort.Count > 0
		 ? customersQuery.OrderByColumnName(sortingParams.ColumnsSort)
		 : customersQuery.OrderBy(x => x.Created);


		if (criteria is not null)
		{
			customersQuery = customersQuery.Where(criteria);
		}

		var filterParams = pagedParams.FilterParams;
		if (filterParams is not null)
		{
			var globalFilter = filterParams.GlobalFilterValue;

			if (!string.IsNullOrEmpty(globalFilter))
			{

			}

			if (filterParams.ColumnsFilter is not null && filterParams.ColumnsFilter.Count != 0)
				customersQuery = customersQuery.FilterByColumn(filterParams.ColumnsFilter);


		}

		return await Paged(
		 customersQuery.Select(p => p.AsDto()),
		 pagedParams.PaginationParams
		 );
	}
}

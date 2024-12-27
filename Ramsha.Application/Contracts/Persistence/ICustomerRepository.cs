using Ramsha.Application.Dtos.Customers;
using Ramsha.Application.DTOs.Common;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Customers;
using Ramsha.Domain.Customers.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.Contracts.Persistence;
public interface ICustomerRepository : IGenericRepository<Customer, CustomerId>
{
	Task<Customer?> FindByUsername(string username);
	Task<PaginationResponseDto<CustomerDto>> GetPaged(PagedParams pagedParams, Expression<Func<Customer, bool>>? criteria = null);
}

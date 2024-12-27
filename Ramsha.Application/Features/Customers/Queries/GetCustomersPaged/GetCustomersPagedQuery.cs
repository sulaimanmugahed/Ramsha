using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Dtos.Customers;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Customers.Queries.GetCustomersPaged;

public class GetCustomersPagedQuery : PagedParams, IRequest<BaseResult<List<CustomerDto>>>
{

}

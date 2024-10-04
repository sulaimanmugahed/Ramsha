using Ramsha.Application.Dtos.Customers;
using Ramsha.Application.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.Features.Customers.Queries.Get;
public class GetCustomerQuery:IRequest<BaseResult<CustomerDto>>
{
	public Guid Id {  get; set; }
}

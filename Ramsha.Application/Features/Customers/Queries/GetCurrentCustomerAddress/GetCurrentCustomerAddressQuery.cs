using MediatR;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Customers.Entities;

namespace Ramsha.Application.Features.Customers.Queries.GetCurrentCustomerAddress;

public class GetCurrentCustomerAddressQuery : IRequest<BaseResult<CustomerAddress?>>
{

}

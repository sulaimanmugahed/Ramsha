using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Customers;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Customers.Queries.GetCustomersPaged;

public class GetCustomersPagedQueryHandler(
ICustomerRepository customerRepository,
IHttpService httpService
) : IRequestHandler<GetCustomersPagedQuery, BaseResult<List<CustomerDto>>>
{
    public async Task<BaseResult<List<CustomerDto>>> Handle(GetCustomersPagedQuery request, CancellationToken cancellationToken)
    {
        var response = await customerRepository.GetPaged(request);

        httpService.AddPagedHeader(response.MetaData);
        return response.Data;
    }
}

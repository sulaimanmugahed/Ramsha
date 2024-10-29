
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Customers.Entities;

namespace Ramsha.Application.Features.Customers.Queries.GetCurrentCustomerAddress;

public class GetCurrentCustomerAddressQueryHandler(
    ICustomerRepository customerRepository,
    IAuthenticatedUserService authenticatedUserService
) : IRequestHandler<GetCurrentCustomerAddressQuery, BaseResult<CustomerAddress?>>
{
    public async Task<BaseResult<CustomerAddress?>> Handle(GetCurrentCustomerAddressQuery request, CancellationToken cancellationToken)
    {
        var customer = await customerRepository.GetAsync(x => x.Username == authenticatedUserService.UserName, x => x.Address);
        if (customer is null)
            return new Error(ErrorCode.ErrorInIdentity);

        return customer.Address;

    }
}

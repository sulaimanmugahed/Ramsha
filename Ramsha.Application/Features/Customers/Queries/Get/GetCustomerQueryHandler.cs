using Ramsha.Application.Contracts.Identity.UserInterfaces;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Customers;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Customers;
using MediatR;


namespace Ramsha.Application.Features.Customers.Queries.Get;
public class GetCustomerQueryHandler(IUserService userService,ICustomerRepository customerRepository) : IRequestHandler<GetCustomerQuery, BaseResult<CustomerDto>>
{
	public async Task<BaseResult<CustomerDto>> Handle(GetCustomerQuery request, CancellationToken cancellationToken)
	{
		var customer = await customerRepository
			.GetByIdAsync(new CustomerId(request.Id));

		if (customer is null)
			return new Error(ErrorCode.RequestedDataNotExist);
	

		var customerAccount = await userService.GetAccount(customer.Username);
		if(!customerAccount.Success)
			return new Error(ErrorCode.RequestedDataNotExist);

		return new CustomerDto {
			Id = customer.Id.Value,
			FirstName = customer.FirstName,
			LastName = customer.LastName,
			Email= customerAccount.Data.Email
		};
		
	}

}

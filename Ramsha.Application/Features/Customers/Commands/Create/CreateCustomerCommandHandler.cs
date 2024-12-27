using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Identity.UserInterfaces;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Account.Requests;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Constants;
using Ramsha.Domain.Customers.Entities;
using MediatR;

namespace Ramsha.Application.Features.Customers.Commands.Create;
internal class CreateCustomerCommandHandler(
	IUserService userService,
	ICustomerRepository customerRepository,
	IUnitOfWork unitOfWork)
	: IRequestHandler<CreateCustomerCommand, BaseResult<string>>
{
	public async Task<BaseResult<string>> Handle(CreateCustomerCommand request, CancellationToken cancellationToken)
	{
		var registerResult = await userService.CreateAccount(new RegisterRequest
		{
			Email = request.Email,
			Password = request.Password,
			Username = request.Username,
			PreferredCurrency = request.PreferredCurrency

		}, roleName: Roles.Customer);

		if (!registerResult.Success)
		{
			return new List<Error>(registerResult.Errors);
		}

		var customer = Customer.Create(
			request.Username,
			request.FirstName,
			request.LastName);

		await customerRepository.AddAsync(customer);

		await unitOfWork.SaveChangesAsync();

		return customer.Id.Value.ToString();
	}
}
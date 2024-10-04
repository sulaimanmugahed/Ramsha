using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Identity.UserInterfaces;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Account.Requests;
using Ramsha.Application.Features.Suppliers.Commands.Create;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Constants;
using Ramsha.Domain.Customers.Entities;
using Ramsha.Domain.Suppliers.Entities;
using MediatR;

namespace Ramsha.Application.Features.Customers.Commands.Create;
internal class CreateSupplierCommandHandler(
	IUserService userService,
	ISupplierRepository supplierRepository,
	IUnitOfWork unitOfWork)
	: IRequestHandler<CreateSupplierCommand, BaseResult<string>>
{
	public async Task<BaseResult<string>> Handle(CreateSupplierCommand request, CancellationToken cancellationToken)
	{
		var registerResult = await userService.CreateAccount(new RegisterRequest
		{
			Email = request.Email,
			Password = request.Password,
			Username = request.Username
		},Roles.Supplier);

		if (!registerResult.Success)

		{
			return new List<Error>(registerResult.Errors);
		}

		var supplier = Supplier.Create(
			request.Username,
			request.FirstName,
			request.LastName);

		await supplierRepository.AddAsync(supplier);

		await unitOfWork.SaveChangesAsync();

		return supplier.Id.Value.ToString();
	}
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Identity.UserInterfaces;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Account.Requests;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Constants;
using Ramsha.Domain.DeliveryAgents;

namespace Ramsha.Application.Features.DeliveryAgents.Commands.CreateDeliveryAgent;

public class CreateDeliveryAgentCommandHandler(
IDeliveryAgentRepository deliveryAgentRepository,
IUnitOfWork unitOfWork,
IUserService userService
) : IRequestHandler<CreateDeliveryAgentCommand, BaseResult<string>>
{
    public async Task<BaseResult<string>> Handle(CreateDeliveryAgentCommand request, CancellationToken cancellationToken)
    {
        var registerResult = await userService.CreateAccount(new RegisterRequest
        {
            Email = request.Email,
            Password = request.Password,
            Username = request.Username

        }, Roles.DeliveryAgent);

        if (!registerResult.Success)
        {
            return new List<Error>(registerResult.Errors);
        }

        var customer = DeliveryAgent.Create(
            request.Username,
            request.FirstName,
            request.LastName);

        await deliveryAgentRepository.AddAsync(customer);

        await unitOfWork.SaveChangesAsync();

        return customer.Id.Value.ToString();
    }
}

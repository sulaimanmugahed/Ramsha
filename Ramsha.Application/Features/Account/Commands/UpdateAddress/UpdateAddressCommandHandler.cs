using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Identity;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Common;

namespace Ramsha.Application.Features.Account.Commands.UpdateAddress;

public class UpdateAddressCommandHandler(
    IAccountServices accountServices,
    IAuthenticatedUserService authenticatedUserService
) : IRequestHandler<UpdateAddressCommand, BaseResult>
{
    public async Task<BaseResult> Handle(UpdateAddressCommand request, CancellationToken cancellationToken)
    {
        await accountServices.UpdateAddress(authenticatedUserService.UserName, request);
        return BaseResult.Ok();
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts.Identity.UserInterfaces;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Constants;

namespace Ramsha.Application.Features.Admin.Commands.CreateAdmin;

public class CreateAdminCommandHandler(
    IUserService userService
) : IRequestHandler<CreateAdminCommand, BaseResult<string>>
{
    public async Task<BaseResult<string>> Handle(CreateAdminCommand request, CancellationToken cancellationToken)
    {
        var result = await userService.CreateAccount(new Dtos.Account.Requests.RegisterRequest
        {
            Email = request.Email,
            Password = request.Password,
            Username = request.Username
        }, Roles.Admin, request.Permissions, true, true);

        if (!result.Success)
        {
            return result.Errors;
        }

        return result.Data.Id.ToString();
    }
}

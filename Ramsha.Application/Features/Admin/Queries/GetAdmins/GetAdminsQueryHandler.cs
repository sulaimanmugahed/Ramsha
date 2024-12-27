using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts.Identity.UserInterfaces;
using Ramsha.Application.Dtos.Admins;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Constants;

namespace Ramsha.Application.Features.Admin.Queries.GetAdmins;

public class GetAdminsQueryHandler(
    IUserService userService
) : IRequestHandler<GetAdminsQuery, BaseResult<List<AdminDto>>>
{
    public async Task<BaseResult<List<AdminDto>>> Handle(GetAdminsQuery request, CancellationToken cancellationToken)
    {
        var response = await userService.GetAccounts(Roles.Admin);
        if (!response.Success)
        {
            return response.Errors;
        }

        return response.Data.Select(x => new AdminDto(x.Id, x.Username, x.Email)).ToList();
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Constants;
using Ramsha.Application.Dtos.Admins;
using Ramsha.Application.Features.Admin.Commands.CreateAdmin;
using Ramsha.Application.Features.Admin.Queries.GetAdmins;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Constants;
using Ramsha.Identity.Attributes;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]

public class AdminsController : BaseApiController
{
    [HasPermission(PermissionType.RolesView)]
    [HttpGet(nameof(Test))]
    public string Test()
 => "hello";

    [HttpGet]
    public async Task<BaseResult<List<AdminDto>>> Get()
    => await Mediator.Send(new GetAdminsQuery());

    [HttpPost]
    public async Task<BaseResult<string>> Create(CreateAdminCommand command)
    => await Mediator.Send(command);
}

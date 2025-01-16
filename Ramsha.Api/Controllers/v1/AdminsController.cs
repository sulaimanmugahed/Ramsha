using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Constants;
using Ramsha.Application.Contracts.Caching;
using Ramsha.Application.Dtos.Admins;
using Ramsha.Application.Features.Admin.Commands.CreateAdmin;
using Ramsha.Application.Features.Admin.Queries.GetAdmins;
using Ramsha.Application.Wrappers;
using Ramsha.Identity.Attributes;


namespace Ramsha.Api.Controllers.v1;



/// <summary>
/// Manages admins-related operations.
/// </summary>
[ApiVersion("1.0")]

public class AdminsController : BaseApiController
{
    /// <summary>
	/// Get all admins
	/// </summary>
	/// <remarks>
	/// This endpoint returns all admin users only user which has AdminsView permission can access this endpoint..
	/// </remarks>
    [HttpGet, HasPermission(PermissionType.AdminsView)]
    public async Task<BaseResult<List<AdminDto>>> Get()
    => await Mediator.Send(new GetAdminsQuery());

    /// <summary>
	/// Create admin
	/// </summary>
	/// <remarks>
	/// This endpoint create new admin user, only user which has AdminsCreate permission can access this endpoint.
	/// </remarks>
    [HttpPost, HasPermission(PermissionType.AdminsCreate)]
    public async Task<BaseResult<string>> Create(CreateAdminCommand command)
    => await Mediator.Send(command);
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Constants;
using Ramsha.Application.Contracts.Identity;

namespace Ramsha.Api.Controllers.v1;


[ApiVersion("1.0")]
public class PermissionsController(IPermissionService permissionService) : BaseApiController
{
    [HttpGet]
    public async Task<List<string>> GetPermissions()
    {
        var permissions = await permissionService.GetPermissionsAsync();
        return permissions.Select(x => x.Item2.ToString()).ToList();
    }

    [HttpGet("role")]
    public async Task<List<string>> GetRolePermissions(string roleName)
    {
        var permissions = await permissionService.GetRolePermissionsAsync(roleName);
        return permissions.Select(x => x.Item2.ToString()).ToList();
    }

    [HttpGet("user")]
    public async Task<List<string>> GetUserPermissions(string username)
    {
        var permissions = await permissionService.GetPermissionsForUserAsync(username);
        return permissions.Select(x => x.PermissionType.ToString()).ToList();
    }

    [HttpPost("role")]
    public async Task<IActionResult> AddPermissionToRole(string roleName, PermissionType permissionType)
    {
        await permissionService.AddPermissionToRole(roleName, permissionType);
        return Ok();
    }

    [HttpPost("user")]
    public async Task<IActionResult> AddPermissionToUser(string username, PermissionType permissionType)
    {
        await permissionService.AddPermissionToUser(username, permissionType);
        return Ok();
    }
}

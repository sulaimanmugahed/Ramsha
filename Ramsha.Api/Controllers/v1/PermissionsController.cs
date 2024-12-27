using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Contracts.Identity;

namespace Ramsha.Api.Controllers.v1;


[ApiVersion("1.0")]
public class PermissionsController(IPermissionService permissionService) : BaseApiController
{
    [HttpGet]
    public async Task<List<string>> GetPermissions()
    {
        var permissions = await permissionService.GetPermissionsAsync();
        return permissions.Select(x => x.Item2).ToList();
    }

    [HttpGet("role")]
    public async Task<List<string>> GetRolePermissions(string roleName)
    {
        var permissions = await permissionService.GetRolePermissionsAsync(roleName);
        return permissions.Select(x => x.Item2).ToList();
    }

    [HttpGet("user")]
    public async Task<List<string>> GetUserPermissions(string username)
    {
        var permissions = await permissionService.GetPermissionsForUserAsync(username);
        return permissions.Select(x => x.Item2).ToList();
    }

    [HttpPost("role")]
    public async Task<IActionResult> AddPermissionToRole(string roleName, string permissionName)
    {
        await permissionService.AddPermissionToRole(roleName, permissionName);
        return Ok();
    }

    [HttpPost("user")]
    public async Task<IActionResult> AddPermissionToUser(string username, string permissionName)
    {
        await permissionService.AddPermissionToUser(username, permissionName);
        return Ok();
    }
}

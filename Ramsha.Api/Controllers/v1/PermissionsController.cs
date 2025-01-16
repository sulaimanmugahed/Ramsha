using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Constants;
using Ramsha.Application.Contracts.Identity;

namespace Ramsha.Api.Controllers.v1;

/// <summary>
/// Manages permissions-related operations.
/// </summary>
[ApiVersion("1.0")]
public class PermissionsController(IPermissionService permissionService) : BaseApiController
{
    /// <summary>
    /// Retrieves all available permissions.
    /// </summary>
    /// <remarks>
    /// This endpoint returns a list of all permissions.
    /// </remarks>
    [HttpGet]
    public async Task<List<string>> GetPermissions()
    {
        var permissions = await permissionService.GetPermissionsAsync();
        return permissions.Select(x => x.Item2.ToString()).ToList();
    }

    /// <summary>
    /// Retrieves permissions assigned to a specific role.
    /// </summary>
    /// <remarks>
    /// This endpoint returns a list of permissions assigned to the specified role.
    /// </remarks>
    [HttpGet("role")]
    public async Task<List<string>> GetRolePermissions(string roleName)
    {
        var permissions = await permissionService.GetRolePermissionsAsync(roleName);
        return permissions.Select(x => x.Item2.ToString()).ToList();
    }

    /// <summary>
    /// Retrieves permissions assigned to a specific user.
    /// </summary>
    /// <remarks>
    /// This endpoint returns a list of permissions assigned to the specified user.
    /// </remarks>
    [HttpGet("user")]
    public async Task<List<string>> GetUserPermissions(string username)
    {
        var permissions = await permissionService.GetPermissionsForUserAsync(username);
        return permissions.Select(x => x.PermissionType.ToString()).ToList();
    }

    /// <summary>
    /// Adds a permission to a role.
    /// </summary>
    /// <remarks>
    /// This endpoint assigns a specific permission to the specified role.
    /// </remarks>
    [HttpPost("role")]
    public async Task<IActionResult> AddPermissionToRole(string roleName, PermissionType permissionType)
    {
        await permissionService.AddPermissionToRole(roleName, permissionType);
        return Ok();
    }

    /// <summary>
    /// Adds a permission to a user.
    /// </summary>
    /// <remarks>
    /// This endpoint assigns a specific permission to the specified user.
    /// </remarks>
    [HttpPost("user")]
    public async Task<IActionResult> AddPermissionToUser(string username, PermissionType permissionType)
    {
        await permissionService.AddPermissionToUser(username, permissionType);
        return Ok();
    }
}
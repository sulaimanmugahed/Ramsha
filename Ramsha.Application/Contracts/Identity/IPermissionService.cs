using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Constants;
using Ramsha.Application.Dtos.Permissions;

namespace Ramsha.Application.Contracts.Identity;

public interface IPermissionService
{
    Task<IEnumerable<(Guid, PermissionType)>> GetPermissionsAsync();

    Task<IEnumerable<PermissionDto>> GetPermissionsForUserAsync(string username);
    Task<IEnumerable<(Guid, PermissionType)>> GetRolePermissionsAsync(string roleName);

    Task AddPermissionToUser(string username, PermissionType permissionType);
    Task AddPermissionToRole(string roleName, PermissionType permissionType);


}

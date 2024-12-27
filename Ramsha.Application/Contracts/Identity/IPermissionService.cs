using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Application.Contracts.Identity;

public interface IPermissionService
{
    Task<IEnumerable<(Guid, string)>> GetPermissionsAsync();

    Task<IEnumerable<(Guid, string)>> GetPermissionsForUserAsync(string username);
    Task<IEnumerable<(Guid, string)>> GetRolePermissionsAsync(string roleName);

    Task AddPermissionToUser(string username, string permissionName);
    Task AddPermissionToRole(string roleName, string permissionName);


}

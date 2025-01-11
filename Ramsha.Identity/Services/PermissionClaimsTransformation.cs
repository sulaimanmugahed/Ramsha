using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.DependencyInjection;
using Ramsha.Application.Constants;
using Ramsha.Application.Contracts.Caching;
using Ramsha.Application.Contracts.Identity;
using Ramsha.Application.Dtos.Permissions;
using Ramsha.Application.Helpers;
using Ramsha.Identity.Extensions;

namespace Ramsha.Identity.Services;

public class PermissionClaimsTransformation(IServiceScopeFactory serviceScopeFactory, ICacheService redisCacheService)
    : IClaimsTransformation
{

    public async Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
    {

        if (principal.Identity?.IsAuthenticated == true
            && !principal.HasClaim(c => c.Type == ApplicationClaims.Permission))
        {
            var username = principal.Identity.Name;
            var cacheKey = CacheKeysHelper.PermissionsCacheKeys.GetUserPermissionsKey(username);
            var permissions = await redisCacheService.GetObject<IEnumerable<PermissionDto>>(cacheKey);
            if (permissions is null)
            {
                using var scope = serviceScopeFactory.CreateScope();

                var permissionService = scope.ServiceProvider.GetRequiredService<IPermissionService>();
                permissions = await permissionService.GetPermissionsForUserAsync(username);
                if (permissions.Any())
                {
                    await redisCacheService.SetObject(cacheKey, permissions, TimeSpan.FromHours(6));
                }
            }

            var claims = permissions.Select(permission => new Claim(ApplicationClaims.Permission, ((int)permission.PermissionType).ToString()));
            var claimsIdentity = new ClaimsIdentity();
            claimsIdentity.AddClaims(claims);
            principal.AddIdentity(claimsIdentity);
        }

        return principal;
    }
}

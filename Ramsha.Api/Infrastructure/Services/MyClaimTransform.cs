using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Constants;

namespace Ramsha.Api.Infrastructure.Services;

public class MyClaimTransform(
ISupplierRepository supplierRepository,
ILogger<MyClaimTransform> logger,
ICustomerRepository customerRepository) : IClaimsTransformation
{
    public async Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
    {

        if (!principal.HasClaim(x => x.Type == "CurrentUserId"))
        {
            var name = principal.Identity?.Name;
            var claimIdentity = new ClaimsIdentity();
            var userId = await GetCurrentUserId(principal.FindFirst(ClaimTypes.Role)?.Value, name);
            claimIdentity.AddClaim(new("CurrentUserId", userId));
            logger.LogWarning($"userId = {userId}");
            principal.AddIdentity(claimIdentity);
        }

        return principal;
    }

    private async Task<string?> GetCurrentUserId(string? role, string userName)
    {
        return role switch
        {
            Roles.Customer => (await customerRepository.FindByUsername(userName))?.Id.Value.ToString(),
            Roles.Supplier => (await supplierRepository.FindByUsername(userName))?.Id.Value.ToString(),
            _ => null
        };
    }
}

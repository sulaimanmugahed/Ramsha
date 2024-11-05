using Microsoft.AspNetCore.Identity;
using Ramsha.Domain.Common;


namespace Ramsha.Identity.Models;
public class Account : IdentityUser<Guid>
{
    public List<RefreshToken> RefreshTokens { get; set; }
    public Address? Address { get; set; }
    public string? Avatar { get; set; }
}


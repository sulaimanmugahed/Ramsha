using Microsoft.AspNetCore.Identity;


namespace Ramsha.Identity.Models;
public class Account : IdentityUser<Guid>
{
    public List<RefreshToken> RefreshTokens { get; set; }
}


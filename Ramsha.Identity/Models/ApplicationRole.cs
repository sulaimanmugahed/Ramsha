using Microsoft.AspNetCore.Identity;


namespace Ramsha.Identity.Models;
public class ApplicationRole(string name): IdentityRole<Guid>(name)
{

}

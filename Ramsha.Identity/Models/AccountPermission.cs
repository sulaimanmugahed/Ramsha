

namespace Ramsha.Identity.Models;

public class AccountPermission
{
    public Guid AccountId { get; set; }
    public Guid PermissionId { get; set; }

    public Account Account { get; set; }
    public Permission Permission { get; set; }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Domain.Common;
public interface ISoftDeletable
{
    public bool IsDeleted { get; protected set; }
    public DateTime? Deleted {  get; protected set; }
    public Guid? DeletedBy { get;protected set; }

    public void Delete(Guid userId)
    {
        DeletedBy = userId;
        IsDeleted = true;
        Deleted = DateTime.UtcNow;
    }

}

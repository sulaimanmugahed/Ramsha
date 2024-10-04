using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Domain.Inventory.Enums;

public enum InventoryStatus
{
    InStock,
    OutOfStock,
    Reserved,
    PendingRestock
}


using Ramsha.Domain.Common;

namespace Ramsha.Domain.Suppliers.Entities;

public class SupplierAddress : Address
{
    public SupplierId Id { get; set; }
}

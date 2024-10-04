
using Ramsha.Domain.Common;

namespace Ramsha.Domain.Customers.Entities;

public class CustomerAddress : Address
{
    public CustomerId Id { get; set; }
}

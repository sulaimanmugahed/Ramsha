using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Domain.Common.Events;

namespace Ramsha.Domain.Products.Events;

public record ProductDataChangedEvent(
    ProductId ProductId
) : IDomainEvent
{

}

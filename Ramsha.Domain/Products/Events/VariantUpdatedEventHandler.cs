using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Domain.Common.Events;

namespace Ramsha.Domain.Products.Events;

public class VariantUpdatedEventHandler : IDomainEventHandler<VariantUpdatedEvent>
{
    public void Handle(VariantUpdatedEvent domainEvent)
    {
        
        
    }
}

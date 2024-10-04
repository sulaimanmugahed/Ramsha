using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Domain.Common.Events;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Domain.Products.Events;

public class VariantUpdatedEvent : IDomainEvent
{
    public ProductVariant ProductVariant { get; }

    public VariantUpdatedEvent(ProductVariant productVariant)
    {
        ProductVariant = productVariant;
    }
}

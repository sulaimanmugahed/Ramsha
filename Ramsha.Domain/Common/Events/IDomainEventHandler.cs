using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Domain.Common.Events;

public interface IDomainEventHandler<T> where T : IDomainEvent
{
    void Handle(T domainEvent);
}
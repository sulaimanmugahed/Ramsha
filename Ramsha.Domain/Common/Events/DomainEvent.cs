using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Domain.Common.Events;

public static class DomainEvents
{
    private static readonly List<object> _handlers = new List<object>();

    public static void Raise<T>(T domainEvent) where T : IDomainEvent
    {
        foreach (var handler in _handlers.OfType<IDomainEventHandler<T>>())
        {
            handler.Handle(domainEvent);
        }
    }

    public static void RegisterHandler<T>(IDomainEventHandler<T> handler) where T : IDomainEvent
    {
        _handlers.Add(handler);
    }
}

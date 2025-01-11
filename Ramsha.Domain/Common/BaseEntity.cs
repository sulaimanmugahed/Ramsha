

using MediatR;
using Ramsha.Domain.Common.Events;

namespace Ramsha.Domain.Common;
public abstract class BaseEntity
{
   private List<IDomainEvent> _domainEvents = [];
   public IReadOnlyCollection<INotification> DomainEvents => _domainEvents.AsReadOnly();


   public void RaiseDomainEvent(IDomainEvent domainEvent)
   {
      _domainEvents.Add(domainEvent);
   }

   public void RemoveDomainEvent(IDomainEvent domainEvent)
   {
      _domainEvents.Remove(domainEvent);
   }

   public void ClearDomainEvent()
   {
      _domainEvents?.Clear();
   }
}

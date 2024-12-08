using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Domain.DeliveryAgents;

namespace Ramsha.Application.Contracts.Persistence;

public interface IDeliveryAgentRepository : IGenericRepository<DeliveryAgent, DeliveryAgentId>
{

}

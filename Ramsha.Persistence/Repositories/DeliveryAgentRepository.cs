using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.DeliveryAgents;
using Ramsha.Persistence.Contexts;

namespace Ramsha.Persistence.Repositories;

public class DeliveryAgentRepository(ApplicationDbContext context)
: GenericRepository<DeliveryAgent, DeliveryAgentId>(context),
IDeliveryAgentRepository
{

}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Dtos.DeliveryAgents;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.DeliveryAgents.Queries.GetAllDeliveryAgents;

public class GetAllDeliveryAgentsQuery : IRequest<BaseResult<List<DeliveryAgentDto>>>
{

}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.DeliveryAgents;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.DeliveryAgents.Queries.GetAllDeliveryAgents;

public class GetAllDeliveryAgentsQueryHandler(
    IDeliveryAgentRepository deliveryAgentRepository
) : IRequestHandler<GetAllDeliveryAgentsQuery, BaseResult<List<DeliveryAgentDto>>>
{
    public async Task<BaseResult<List<DeliveryAgentDto>>> Handle(GetAllDeliveryAgentsQuery request, CancellationToken cancellationToken)
    {
        var agents = await deliveryAgentRepository.GetAllAsync();

        return agents.Select(x => new DeliveryAgentDto(x.Id.Value, x.Username)).ToList();
    }
}

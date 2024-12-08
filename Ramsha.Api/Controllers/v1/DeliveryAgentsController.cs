
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Dtos.DeliveryAgents;
using Ramsha.Application.Features.DeliveryAgents.Commands.CreateDeliveryAgent;
using Ramsha.Application.Features.DeliveryAgents.Queries.GetAllDeliveryAgents;
using Ramsha.Application.Wrappers;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]
public class DeliveryAgentsController : BaseApiController
{
    [HttpPost]
    public async Task<BaseResult<string>> Create(CreateDeliveryAgentCommand command)
        => await Mediator.Send(command);


    [HttpGet]
    public async Task<BaseResult<List<DeliveryAgentDto>>> GetAll()
    => await Mediator.Send(new GetAllDeliveryAgentsQuery());
}

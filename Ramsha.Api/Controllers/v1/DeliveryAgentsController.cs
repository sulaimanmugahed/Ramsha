using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Dtos.DeliveryAgents;
using Ramsha.Application.Features.DeliveryAgents.Commands.CreateDeliveryAgent;
using Ramsha.Application.Features.DeliveryAgents.Queries.GetAllDeliveryAgents;
using Ramsha.Application.Wrappers;

namespace Ramsha.Api.Controllers.v1;

/// <summary>
/// Manages delivery agent-related operations.
/// </summary>
[ApiVersion("1.0")]
public class DeliveryAgentsController : BaseApiController
{
    /// <summary>
    /// Creates a new delivery agent.
    /// </summary>
    /// <remarks>
    /// This endpoint creates a new delivery agent with the provided details.
    /// Returns the ID of the newly created delivery agent.
    /// </remarks>
    [HttpPost]
    public async Task<BaseResult<string>> Create(CreateDeliveryAgentCommand command)
        => await Mediator.Send(command);

    /// <summary>
    /// Retrieves all delivery agents.
    /// </summary>
    /// <remarks>
    /// This endpoint returns a list of all available delivery agents .
    /// </remarks>
    [HttpGet]
    public async Task<BaseResult<List<DeliveryAgentDto>>> GetAll()
        => await Mediator.Send(new GetAllDeliveryAgentsQuery());
}
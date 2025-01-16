using Asp.Versioning;
using Ramsha.Application.Dtos.Common;
using Ramsha.Application.Features.Common.Commands.AddNewOption;
using Ramsha.Application.Features.Common.Commands.RemoveOption;
using Ramsha.Application.Features.Common.Queries.GetOption;
using Ramsha.Application.Wrappers;
using Microsoft.AspNetCore.Mvc;

namespace Ramsha.Api.Controllers.v1;

/// <summary>
/// Manages options-related operations.
/// </summary>
[ApiVersion("1.0")]
public class OptionsController : BaseApiController
{
    /// <summary>
    /// Retrieves all options.
    /// </summary>
    /// <remarks>
    /// This endpoint returns a list of all available options in the system.
    /// </remarks>
    [HttpGet]
    public async Task<BaseResult<List<OptionDto?>>> GetOptions()
        => await Mediator.Send(new GetOptionsQuery());

    /// <summary>
    /// Retrieves a specific option by its ID.
    /// </summary>
    /// <remarks>
    /// This endpoint returns the details of an option identified by its unique ID.
    /// </remarks>
    [HttpGet("{id}", Name = nameof(GetOption))]
    public async Task<BaseResult<OptionDto?>> GetOption(Guid id)
        => await Mediator.Send(new GetOptionQuery { Id = id });

    /// <summary>
    /// Deletes an option by its ID.
    /// </summary>
    /// <remarks>
    /// This endpoint deletes an option identified by its unique ID.
    /// </remarks>
    [HttpDelete("{id}")]
    public async Task<BaseResult> DeleteOption(Guid id)
        => await Mediator.Send(new RemoveOptionCommand { OptionId = id });

    /// <summary>
    /// Adds a new option.
    /// </summary>
    /// <remarks>
    /// This endpoint creates a new option with the provided details.
    /// Returns the ID of the newly created option and a link to retrieve it.
    /// </remarks>
    [HttpPost]
    public async Task<ActionResult<BaseResult<string>>> AddNewOption(AddNewOptionCommand command)
    {
        var result = await Mediator.Send(command);
        if (!result.Success)
            return result;

        return CreatedAtRoute(nameof(GetOption), new { id = result.Data }, result.Data);
    }
}
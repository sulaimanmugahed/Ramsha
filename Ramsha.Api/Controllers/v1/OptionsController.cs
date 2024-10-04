
using Asp.Versioning;
using Ramsha.Application.Dtos.Common;
using Ramsha.Application.Features.Common.Commands.AddNewOption;
using Ramsha.Application.Features.Common.Commands.RemoveOption;
using Ramsha.Application.Features.Common.Queries.GetOption;
using Ramsha.Application.Wrappers;
using Microsoft.AspNetCore.Mvc;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]
public class OptionsController : BaseApiController
{

    [HttpGet]
    public async Task<BaseResult<List<OptionDto?>>> GetOptions()
    => await Mediator.Send(new GetOptionsQuery());


    [HttpGet("{id}", Name = nameof(GetOption))]
    public async Task<BaseResult<OptionDto?>> GetOption(Guid id)
    => await Mediator.Send(new GetOptionQuery { Id = id });

    [HttpDelete("{id}")]
    public async Task<BaseResult> DeleteOption(Guid id)
    => await Mediator.Send(new RemoveOptionCommand { OptionId = id });


    [HttpPost]
    public async Task<ActionResult<BaseResult<string>>> AddNewOption(AddNewOptionCommand command)
    {
        var result = await Mediator.Send(command);
        if (!result.Success)
            return result;

        return CreatedAtRoute(nameof(GetOption), new { id = result.Data }, result.Data);
    }
}

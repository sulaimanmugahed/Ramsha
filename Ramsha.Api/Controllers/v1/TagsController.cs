using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Features.Tags.Commands.CreateTag;
using Ramsha.Application.Features.Tags.Commands.DeleteTag;
using Ramsha.Application.Features.Tags.Commands.UpdateTag;
using Ramsha.Application.Features.Tags.Queries.GetTag;
using Ramsha.Application.Features.Tags.Queries.GetTags;
using Ramsha.Application.Wrappers;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]
public class TagsController : BaseApiController
{
    [HttpGet]
    public async Task<BaseResult<List<TagDto>>> GetTags()
   => await Mediator.Send(new GetTagsQuery());

    [HttpGet("{id}")]
    public async Task<BaseResult<TagDto>> GetTag(Guid id)
   => await Mediator.Send(new GetTagQuery { Id = id });

    [HttpPost]
    public async Task<BaseResult<string>> CreateBrands(CreateTagCommand command)
   => await Mediator.Send(command);

    [HttpPut("{id}")]
    public async Task<BaseResult> UpdateBrands(Guid id, UpdateTagCommand command)
    {
        command.Id = id;
        return await Mediator.Send(command);
    }

    [HttpDelete("{id}")]
    public async Task<BaseResult> DeleteBrands(Guid id)
   => await Mediator.Send(new DeleteTagCommand { Id = id });
}

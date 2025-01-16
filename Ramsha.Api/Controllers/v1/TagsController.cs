using System;
using System.Collections.Generic;
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

/// <summary>
/// Manages tag-related operations.
/// </summary>
[ApiVersion("1.0")]
public class TagsController : BaseApiController
{
    /// <summary>
    /// Retrieves all tags.
    /// </summary>
    /// <remarks>
    /// This endpoint returns a list of all available tags.
    /// </remarks>
    [HttpGet]
    public async Task<BaseResult<List<TagDto>>> GetTags()
        => await Mediator.Send(new GetTagsQuery());

    /// <summary>
    /// Retrieves a specific tag by its ID.
    /// </summary>
    /// <remarks>
    /// This endpoint returns the details of a tag identified by its unique ID.
    /// </remarks>
    [HttpGet("{id}")]
    public async Task<BaseResult<TagDto>> GetTag(Guid id)
        => await Mediator.Send(new GetTagQuery { Id = id });

    /// <summary>
    /// Creates a new tag.
    /// </summary>
    /// <remarks>
    /// This endpoint creates a new tag with the provided details.
    /// Returns the ID of the newly created tag.
    /// </remarks>
    [HttpPost]
    public async Task<BaseResult<string>> CreateBrands(CreateTagCommand command)
        => await Mediator.Send(command);

    /// <summary>
    /// Updates an existing tag.
    /// </summary>
    /// <remarks>
    /// This endpoint updates the details of an existing tag identified by its ID.
    /// </remarks>
    [HttpPut("{id}")]
    public async Task<BaseResult> UpdateBrands(Guid id, UpdateTagCommand command)
    {
        command.Id = id;
        return await Mediator.Send(command);
    }

    /// <summary>
    /// Deletes a tag by its ID.
    /// </summary>
    /// <remarks>
    /// This endpoint deletes a tag identified by its unique ID.
    /// </remarks>
    [HttpDelete("{id}")]
    public async Task<BaseResult> DeleteBrands(Guid id)
        => await Mediator.Send(new DeleteTagCommand { Id = id });
}
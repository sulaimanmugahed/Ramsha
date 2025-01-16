using Asp.Versioning;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Features.Products.Commands.CreateCategory;
using Ramsha.Application.Features.Products.Queries.GetCategories;
using Ramsha.Application.Wrappers;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Features.Products.Commands.RemoveCategory;
using Ramsha.Application.Features.Products.Commands.UpdateCategory;

namespace Ramsha.Api.Controllers.v1;

/// <summary>
/// Manages category-related operations.
/// </summary>
[ApiVersion("1.0")]
public class CategoriesController : BaseApiController
{
    /// <summary>
    /// Creates a new category.
    /// </summary>
    /// <remarks>
    /// This endpoint creates a new category with the provided details.
    /// Returns the ID of the newly created category.
    /// </remarks>
    [HttpPost]
    public async Task<BaseResult<string>> CreateCategory([FromBody] CreateCategoryCommand command)
        => await Mediator.Send(command);

    /// <summary>
    /// Retrieves all categories.
    /// </summary>
    /// <remarks>
    /// This endpoint returns a list of all available categories in the system.
    /// </remarks>
    [HttpGet]
    public async Task<BaseResult<List<CategoryDto>>> GetCategories()
        => await Mediator.Send(new GetCategoriesQuery());

    /// <summary>
    /// Deletes a category by ID.
    /// </summary>
    /// <remarks>
    /// This endpoint deletes a category identified by its unique ID.
    /// </remarks>
    [HttpDelete("{id}")]
    public async Task<BaseResult> Remove(Guid id)
        => await Mediator.Send(new RemoveCategoryCommand { Id = id });

    /// <summary>
    /// Updates an existing category.
    /// </summary>
    /// <remarks>
    /// This endpoint updates the details of an existing category identified by its ID.
    /// </remarks>
    [HttpPut("{id}")]
    public async Task<BaseResult> Update(Guid id, UpdateCategoryCommand command)
    {
        command.Id = id;
        return await Mediator.Send(command);
    }

}

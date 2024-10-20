using Asp.Versioning;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Features.Products.Commands.CreateCategory;
using Ramsha.Application.Features.Products.Queries.GetCategories;
using Ramsha.Application.Wrappers;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Features.Products.Commands.RemoveCategory;
using Ramsha.Application.Features.Products.Commands.UpdateCategory;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]
public class CategoriesController : BaseApiController
{
    [HttpPost]
    public async Task<BaseResult<string>> CreateCategory([FromBody] CreateCategoryCommand command)
        => await Mediator.Send(command);

    [HttpGet]
    public async Task<BaseResult<List<CategoryDto>>> GetCategories()
        => await Mediator.Send(new GetCategoriesQuery());

    [HttpDelete("{id}")]
    public async Task<BaseResult> Remove(Guid id)
   => await Mediator.Send(new RemoveCategoryCommand { Id = id });

    [HttpPut("{id}")]
    public async Task<BaseResult> Update(Guid id, UpdateCategoryCommand command)
    {
        command.Id = id;
        return await Mediator.Send(command);
    }

}

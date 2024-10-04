using Asp.Versioning;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Features.Products.Commands.CreateCategory;
using Ramsha.Application.Features.Products.Queries.GetCategories;
using Ramsha.Application.Wrappers;
using Microsoft.AspNetCore.Mvc;

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
}

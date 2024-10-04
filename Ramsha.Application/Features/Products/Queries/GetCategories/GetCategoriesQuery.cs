
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Queries.GetCategories;

public class GetCategoriesQuery:IRequest<BaseResult<List<CategoryDto>>>
{
    
}

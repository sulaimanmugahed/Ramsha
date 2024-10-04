
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Queries.GetProductsList;

public class GetProductsListQuery : IRequest<BaseResult<List<ProductDto?>>>
{

}

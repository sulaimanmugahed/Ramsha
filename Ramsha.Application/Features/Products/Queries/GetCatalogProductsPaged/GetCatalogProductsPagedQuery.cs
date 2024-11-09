
using MediatR;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Products.Queries.GetCatalogProductsPaged;

public class GetCatalogProductsPagedQuery : PagedParams, IRequest<BaseResult<List<CatalogProductDto>>>
{

}

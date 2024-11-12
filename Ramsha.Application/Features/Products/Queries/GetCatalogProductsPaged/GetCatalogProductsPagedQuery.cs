
using MediatR;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Application.Features.Products.Queries.GetCatalogProductsPaged;

public class GetCatalogProductsPagedQuery : PagedParams, IRequest<BaseResult<List<CatalogProductDto>>>
{
}

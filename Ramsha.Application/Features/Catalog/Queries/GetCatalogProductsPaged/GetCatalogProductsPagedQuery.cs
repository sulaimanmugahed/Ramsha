

using MediatR;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Catalog.Queries.GetCatalogProductsPaged;

public class GetCatalogProductsPagedQuery : PagedParams, IRequest<BaseResult<List<CatalogProductDto>>>
{
}


using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Catalog.Queries.GetCatalogInventoryItems;

public class GetCatalogInventoryItemsQuery : PagedParams, IRequest<BaseResult<List<CatalogInventoryItemDetailDto>>>
{
    public Guid ProductId { get; set; }
    public Guid? ProductVariantId { get; set; }

}

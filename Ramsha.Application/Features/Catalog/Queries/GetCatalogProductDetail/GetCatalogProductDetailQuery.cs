

using MediatR;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Wrappers;


namespace Ramsha.Application.Features.Catalog.Queries.GetCatalogProductDetail;

public class GetCatalogProductDetailQuery : IRequest<BaseResult<CatalogProductDetailDto>>
{
    public Guid ProductId { get; set; }
}


using MediatR;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products;

namespace Ramsha.Application.Features.Catalog.Queries.GetCatalogProductVariant;

public class GetCatalogProductVariantQuery : IRequest<BaseResult<CatalogVariantDto?>>
{
    public Guid? ProductVariantId { get; set; }
    public Guid ProductId { get; set; }
}

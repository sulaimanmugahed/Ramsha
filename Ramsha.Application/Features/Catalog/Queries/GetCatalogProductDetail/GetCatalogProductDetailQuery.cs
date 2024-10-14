using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products;

namespace Ramsha.Application.Features.Catalog.Queries.GetCatalogProductDetail;

public class GetCatalogProductDetailQuery : IRequest<BaseResult<CatalogProductDetailDto>>
{
    public Guid ProductId { get; set; }
}

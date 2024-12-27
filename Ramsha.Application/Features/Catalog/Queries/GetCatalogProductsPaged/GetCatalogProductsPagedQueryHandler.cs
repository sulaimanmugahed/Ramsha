using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Catalog.Queries.GetCatalogProductsPaged;

public class GetCatalogProductsPagedQueryHandler(
    IProductRepository productRepository,
    IHttpService httpService
) : IRequestHandler<GetCatalogProductsPagedQuery, BaseResult<List<CatalogProductDto>>>
{
    public async Task<BaseResult<List<CatalogProductDto>>> Handle(GetCatalogProductsPagedQuery request, CancellationToken cancellationToken)
    {
        var result = await productRepository.GetCatalogProductsPaged(request, p => p.Status == Domain.Products.Enums.ProductStatus.Active);

        result.AddFilterMetaData(request.FilterParams);
        result.AddSortingMetaData(request.SortingParams);

        httpService.AddPagedHeader(result.MetaData);
        return result.Data;
    }
}

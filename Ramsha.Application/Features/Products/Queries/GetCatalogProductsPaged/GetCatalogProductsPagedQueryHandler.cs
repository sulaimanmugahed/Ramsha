using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Products.Queries.GetCatalogProductsPaged;

public class GetCatalogProductsPagedQueryHandler(
    IProductRepository productRepository,
    IHttpService httpService
) : IRequestHandler<GetCatalogProductsPagedQuery, BaseResult<List<CatalogProductDto>>>
{
    public async Task<BaseResult<List<CatalogProductDto>>> Handle(GetCatalogProductsPagedQuery request, CancellationToken cancellationToken)
    {
        var result = await productRepository.GetCatalogProductsPaged(request.PaginationParams);
        httpService.AddPagedHeader(result.MetaData);
        return result.Data;
    }
}

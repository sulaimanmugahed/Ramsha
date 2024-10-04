using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Queries.GetProductsPaged;

public class GetProductsPagedQueryHandler(
    IProductRepository productRepository,
    IHttpService httpService
) : IRequestHandler<GetProductsPagedQuery, BaseResult<List<ProductDto>>>
{
    public async Task<BaseResult<List<ProductDto>>> Handle(GetProductsPagedQuery request, CancellationToken cancellationToken)
    {
        var result = await productRepository.GetProductsPaged(
            request.PaginationParams,
            request.FilterParams,
            request.SortingParams);

        result.AddFilterMetaData(request.FilterParams);

        result.AddSortingMetaData(request.SortingParams);

        httpService.AddPagedHeader(result.MetaData);

        return result.Data;
    }
}

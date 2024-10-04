using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text.Json;
using System.Threading.Tasks;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Queries.GetProductsList;

public class GetProductsListQueryHandler(
    IProductRepository productRepository


) : IRequestHandler<GetProductsListQuery, BaseResult<List<ProductDto>>>
{
    public async Task<BaseResult<List<ProductDto?>>> Handle(GetProductsListQuery request, CancellationToken cancellationToken)
    {
        var products = await productRepository.GetAllWithIncludeAsync(
         x => x.Options,
         x => x.Category,
         X => X.Inventories
        );


        return products.Select(p => p?.AsDto()).ToList();
    }
}

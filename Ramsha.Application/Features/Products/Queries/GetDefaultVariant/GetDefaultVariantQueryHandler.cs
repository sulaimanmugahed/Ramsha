using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Products.Queries.GetDefaultVariant;

public class GetDefaultVariantQueryHandler(IProductRepository productRepository) : IRequestHandler<GetDefaultVariantQuery, BaseResult<ProductVariantDto?>>
{
    public async Task<BaseResult<ProductVariantDto?>> Handle(GetDefaultVariantQuery request, CancellationToken cancellationToken)
    {
        var variant = await productRepository.GetDefaultVariant(new Domain.Products.ProductId(request.ProductId));
        return variant?.AsDto();
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Brands.Queries.GetBrand;

public class GetBrandQueryHandler(
    IBrandRepository brandRepository
) : IRequestHandler<GetBrandQuery, BaseResult<BrandDto>>
{
    public async Task<BaseResult<BrandDto>> Handle(GetBrandQuery request, CancellationToken cancellationToken)
    {
        var existBrand = await brandRepository.GetByIdAsync(new Domain.Products.BrandId(request.Id));

        if (existBrand is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no brand with this id");
        return existBrand.AsDto();
    }
}
